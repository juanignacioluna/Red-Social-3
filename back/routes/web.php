<?php
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

use App\User;

use App\Tuit;

use App\Seguidore;

use App\Megusta;

use App\Retuit;

use App\Noti;




/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {

    return "home";

});


Route::get('getSession', function () {

    return session('user');

});


Route::post('registro', function (Request $request) {


    if (User::where('user',$request->user)->count() > 0) {
        return "Ya existe un usuario con ese nombre";
     }else{

        $user = new User;

        $user->fullName = $request->fullName;
        
        $user->user = $request->user;
    
        $user->password = $request->password;

        $user->siguiendo = 0;

        $user->seguidores = 0;
        
        $user->save();

        session(['user' => $request->user]);
    
        return "Usuario registrado correctamente";

     }

});

Route::get('cerrarSesion', function () {

    session()->forget('user');

    session()->flush();


});


Route::post('login', function (Request $request) {

    $matchThese = ['user' => $request->user, 'password' => $request->password];


    if (User::where($matchThese)->count() > 0) {

        session(['user' => $request->user]);

        return "Bienvenido " . session('user');

     }else{
    
        return "Datos incorrectos";

     }

});



Route::get('getPersonalData', function () {

    return User::where('user', session('user'))->get();

});


Route::post('tuitear', function (Request $request) {

    $tuit = new Tuit;

    $tuit->user = session('user');
    
    $tuit->tuit = $request->tuit;

    $tuit->rt = 0;

    $tuit->mg = 0;

    $tuit->rtSiOno = "no";
    
    $tuit->save();

    return "Posteado";


});


Route::post('getPersonalDataCostum', function (Request $request) {

    return User::where('user', $request->user)->get();

});



Route::get('getTuitsMiPerfil', function () {

    return DB::select("SELECT * FROM tuits WHERE (rtSiOno = ? and rtPOR = ?)
    or (rtSiOno = ? and user = ?) order by id desc", ['si', session('user'), 'no', session('user')]);

});



Route::post('buscar', function (Request $request) {

    return User::query()
    ->where('fullName', 'LIKE', "%{$request->busqueda}%") 
    ->orWhere('user', 'LIKE', "%{$request->busqueda}%") 
    ->get();

});


Route::post('seguir', function (Request $request) {


    $matchThese = ['esteUsuario' => session('user'), 'sigueAa' => $request->user];


    if (Seguidore::where($matchThese)->count() > 0) {

        Seguidore::where($matchThese)->delete();

        User::where('user', session('user'))->decrement('siguiendo');

        User::where('user', $request->user)->decrement('seguidores');

        return "Unfollow";

     }else{

        $seguidor = new Seguidore;

        $seguidor->esteUsuario = session('user');
        
        $seguidor->sigueAa = $request->user;
        
        $seguidor->save();

        User::where('user', session('user'))->increment('siguiendo');

        User::where('user', $request->user)->increment('seguidores');


        $noti = new Noti;

        $noti->emisor = session('user');

        $noti->receptor = $request->user;
        
        $noti->seguidorNuevo = 1;
        
        $noti->save();


    
        return "Seguido";

     }


});




Route::get('getQuienSigo', function () {

    return Seguidore::where('esteUsuario', session('user'))->get();

});



Route::post('getTuitsOtroPerfil', function (Request $request) {

    return DB::select("SELECT * FROM tuits WHERE (rtSiOno = ? and rtPOR = ?)
    or (rtSiOno = ? and user = ?) order by id desc", ['si', $request->user, 'no', $request->user]);

});


Route::get('getTuitsTimeline', function () {

    return DB::select("SELECT * FROM tuits WHERE (rtSiOno = ? and rtPOR = ?)
    or (rtSiOno = ? and rtPOR IN (select sigueAa from seguidores where
    esteUsuario = ?) ) or (rtSiOno = ? and user = ?) or (rtSiOno = ? and
    user IN (select sigueAa from seguidores where esteUsuario = ?)) order by
    id desc", ['si', session('user'), 'si', session('user'), 'no', 
    session('user'), 'no', session('user')]);

});


Route::post('mg', function (Request $request) {


    $rtSiOno = Tuit::where('id', $request->idTUIT)->pluck('rtSiOno')->toArray();


    if($rtSiOno[0]=="si"){

        $idTuitOriginal = Tuit::where('id', $request->idTUIT)->pluck('idTuitOriginal')->toArray();


        $matchThese = ['user' => session('user'), 'idTuitOriginal' => $idTuitOriginal[0]];

        if(Megusta::where($matchThese)->count() > 0){

            Megusta::where($matchThese)->delete();

            Tuit::where('id', $idTuitOriginal[0])->decrement('mg');

            Tuit::where('idTuitOriginal', $idTuitOriginal[0])->decrement('mg');

            return "Desfaveado";

        }else{

            $mg = new Megusta;

            $mg->user = session('user');
            
            $mg->idTuitOriginal = $idTuitOriginal[0];
            
            $mg->save();

            Tuit::where('id', $idTuitOriginal[0])->increment('mg');

            Tuit::where('idTuitOriginal', $idTuitOriginal[0])->increment('mg');


            $rtPOR = Tuit::where('id', $request->idTUIT)->pluck('rtPOR')->toArray();

            $noti = new Noti;

            $noti->emisor = session('user');
    
            $noti->receptor = $rtPOR[0];

            $noti->idTuit = $idTuitOriginal[0];
            
            $noti->likeART = 1;
            
            $noti->save();


            $dueno = Tuit::where('id', $request->idTUIT)->pluck('user')->toArray();

            $noti2 = new Noti;

            $noti2->emisor = session('user');
    
            $noti2->receptor = $dueno[0];

            $noti2->idTuit = $idTuitOriginal[0];
            
            $noti2->likeAtuit = 1;
            
            $noti2->save();



            return "Faveado";

        }


    }else if($rtSiOno[0]=="no"){


        $matchThese = ['user' => session('user'), 'idTuitOriginal' => $request->idTUIT];

        if(Megusta::where($matchThese)->count() > 0){

                Megusta::where($matchThese)->delete();

                Tuit::where('id', $request->idTUIT)->decrement('mg');

                Tuit::where('idTuitOriginal', $request->idTUIT)->decrement('mg');

                return "Desfaveado";


        }else{

                $mg = new Megusta;

                $mg->user = session('user');
                
                $mg->idTuitOriginal = $request->idTUIT;
                
                $mg->save();

                Tuit::where('id', $request->idTUIT)->increment('mg');

                Tuit::where('idTuitOriginal', $request->idTUIT)->increment('mg');


                $dueno = Tuit::where('id', $request->idTUIT)->pluck('user')->toArray();

                $noti = new Noti;

                $noti->emisor = session('user');
        
                $noti->receptor = $dueno[0];

                $noti->idTuit = $request->idTUIT;
                
                $noti->likeAtuit = 1;
                
                $noti->save();


                return "Faveado";

        }



    }


});


Route::post('rt', function (Request $request) {


    $rtSiOno = Tuit::where('id', $request->idTUIT)->pluck('rtSiOno')->toArray();


    if($rtSiOno[0]=="si"){

        $idTuitOriginal = Tuit::where('id', $request->idTUIT)->pluck('idTuitOriginal')->toArray();


        $matchThese = ['user' => session('user'), 'idTuitOriginal' => $idTuitOriginal[0]];

        if(Retuit::where($matchThese)->count() > 0){

            Retuit::where($matchThese)->delete();

            $queryRT = ['rtPOR' => session('user'), 'idTuitOriginal' => $idTuitOriginal[0]];

            Tuit::where($queryRT)->delete();

            Tuit::where('id', $idTuitOriginal[0])->decrement('rt');

            Tuit::where('idTuitOriginal', $idTuitOriginal[0])->decrement('rt');

            return "Desretuiteado";

        }else{

            $rt = new Retuit;

            $rt->user = session('user');
            
            $rt->idTuitOriginal = $idTuitOriginal[0];
            
            $rt->save();

            $infoTW = Tuit::where('id', $idTuitOriginal[0])->get()->toArray();

            $tw = new Tuit;

            $tw->user = $infoTW[0]['user'];
            
            $tw->tuit = $infoTW[0]['tuit'];
            
            $tw->rt = $infoTW[0]['rt'];
            
            $tw->mg = $infoTW[0]['mg'];

            $tw->rtSiOno = "si";

            $tw->rtPOR = session('user');

            $tw->idTuitOriginal = $infoTW[0]['id'];
            
            $tw->save();

            Tuit::where('id', $idTuitOriginal[0])->increment('rt');

            Tuit::where('idTuitOriginal', $idTuitOriginal[0])->increment('rt');





            $rtPOR = Tuit::where('id', $request->idTUIT)->pluck('rtPOR')->toArray();

            $noti = new Noti;

            $noti->emisor = session('user');
    
            $noti->receptor = $rtPOR[0];
            
            $noti->rtART = 1;

            $noti->idTuit = $idTuitOriginal[0];
            
            $noti->save();


            $dueno = Tuit::where('id', $request->idTUIT)->pluck('user')->toArray();

            $noti2 = new Noti;

            $noti2->emisor = session('user');
    
            $noti2->receptor = $dueno[0];
            
            $noti2->rtAtuit = 1;

            $noti2->idTuit = $idTuitOriginal[0];
            
            $noti2->save();



            return "Retuiteado";

        }


    }else if($rtSiOno[0]=="no"){


        $matchThese = ['user' => session('user'), 'idTuitOriginal' => $request->idTUIT];

        if(Retuit::where($matchThese)->count() > 0){

                Retuit::where($matchThese)->delete();

                $queryRT = ['rtPOR' => session('user'), 'idTuitOriginal' => $request->idTUIT];

                Tuit::where($queryRT)->delete();

                Tuit::where('id', $request->idTUIT)->decrement('rt');

                Tuit::where('idTuitOriginal', $request->idTUIT)->decrement('rt');

                return "Desretuiteado";


        }else{

                $rt = new Retuit;

                $rt->user = session('user');
                
                $rt->idTuitOriginal = $request->idTUIT;
                
                $rt->save();



                $infoTW = Tuit::where('id', $request->idTUIT)->get()->toArray();

                $tw = new Tuit;

                $tw->user = $infoTW[0]['user'];
                
                $tw->tuit = $infoTW[0]['tuit'];
                
                $tw->rt = $infoTW[0]['rt'];
                
                $tw->mg = $infoTW[0]['mg'];

                $tw->rtSiOno = "si";

                $tw->rtPOR = session('user');

                $tw->idTuitOriginal = $infoTW[0]['id'];
                
                $tw->save();

                Tuit::where('id', $request->idTUIT)->increment('rt');

                Tuit::where('idTuitOriginal', $request->idTUIT)->increment('rt');

    
    
                $dueno = Tuit::where('id', $request->idTUIT)->pluck('user')->toArray();
    
                $noti2 = new Noti;
    
                $noti2->emisor = session('user');
        
                $noti2->receptor = $dueno[0];
                
                $noti2->rtAtuit = 1;

                $noti2->idTuit = $request->idTUIT;
                
                $noti2->save();



                return "Retuiteado";

        }



    }


});


Route::post('getDataPosteo', function (Request $request) {

    return Tuit::where('id', $request->idTUIT)->get();

});



Route::post('verificarSiLoFavie', function (Request $request) {


    $rtSiOno = Tuit::where('id', $request->idTUIT)->pluck('rtSiOno')->toArray();


    if($rtSiOno[0]=="si"){

        $idTuitOriginal = Tuit::where('id', $request->idTUIT)->pluck('idTuitOriginal')->toArray();

        $matchThese = ['user' => session('user'), 'idTuitOriginal' => $idTuitOriginal[0]];


        if (Megusta::where($matchThese)->count() > 0) {
    
            return "si";
    
         }else{
    
            return "no";
    
         }

    }else if($rtSiOno[0]=="no"){

        $matchThese = ['user' => session('user'), 'idTuitOriginal' => $request->idTUIT];


        if (Megusta::where($matchThese)->count() > 0) {
    
            return "si";
    
         }else{
    
            return "no";
    
         }

    }



});


Route::post('verificarSiLoRT', function (Request $request) {


    $rtSiOno = Tuit::where('id', $request->idTUIT)->pluck('rtSiOno')->toArray();


    if($rtSiOno[0]=="si"){

        $idTuitOriginal = Tuit::where('id', $request->idTUIT)->pluck('idTuitOriginal')->toArray();

        $matchThese = ['user' => session('user'), 'idTuitOriginal' => $idTuitOriginal[0]];


        if (Retuit::where($matchThese)->count() > 0) {
    
            return "si";
    
         }else{
    
            return "no";
    
         }

    }else if($rtSiOno[0]=="no"){

        $matchThese = ['user' => session('user'), 'idTuitOriginal' => $request->idTUIT];


        if (Retuit::where($matchThese)->count() > 0) {
    
            return "si";
    
         }else{
    
            return "no";
    
         }

    }



});



Route::get('getNotis', function () {

    return Noti::where('receptor', session('user'))->orderBy('id','DESC')->get();

});

