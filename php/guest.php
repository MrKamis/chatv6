<?php
    include('db.php');

    while(true){
        $rand = rand(99, 999999);
        $q = $db->prepare('SELECT login FROM users WHERE login=:login');
        $q->bindParam(1, $rand);
        $q->execute();

        $r = $q->fetchAll();
        if(count($r) == 0){
            print($rand);
            $q = $db->prepare('INSERT INTO guests(login, room, lastActivity, options, saved) VALUES(?, NULL, ?, NULL, NULL)');
            $time = time();
            $q->bindParam(1, $rand);
            $q->bindParam(2, $time);
            $q->execute();
            break;
        }
    }
?>