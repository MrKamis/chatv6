<?php
    include('db.php');
    
    try {

        $q = $db->prepare('SELECT * FROM users WHERE login=:login');
        $q->bindParam(1, $_POST['login']);
        $q->execute();

        $r = $q->fetchAll();
        if(count($r) == 0){
            throw new Exception('User not exists', 5);
        }else{

            $q = $db->prepare('SELECT * FROM users WHERE login=:login AND password=:password');
            $q->bindParam(1, $_POST['login']);
            $password = md5($_POST['password']);
            $q->bindParam(2, $password);
            $q->execute();

            $r = $q->fetchAll();
            if(count($r) == 0){
                throw new Exception('Bad password', 10);
            }

            $options = json_encode($r[0]['options']);
            print($options);
            
        }

    }catch(Exception $e){
        print($e->getCode());
    }
?>