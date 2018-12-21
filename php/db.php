<?php
    $db = new PDO('sqlite: chat.sqlite');
    $q = $db->prepare('CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY, login TEXT, password TEXT, currentRoom INT, options TEXT, saved TEXT, lastActivity TEXT)');
    $q->execute();
    $q = $db->prepare('CREATE TABLE IF NOT EXISTS rooms (id INT PRIMARY KEY, name TEXT, messages TEXT, password TEXT, options TEXT)');
    $q->execute();
    $q = $db->prepare('CREATE TABLE IF NOT EXISTS guests (id iNT PRIMARY KEY AUTOINCREMENT, login TEXT, )');
?>