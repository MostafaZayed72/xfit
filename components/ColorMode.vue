<template>
   <div class="flex gap-2 cursor-pointer" >
       <Icon  v-if="$colorMode.preference!= 'dark'" name="material-symbols:nightlight" class="text-2xl" @click="$colorMode.preference= 'dark'" />
       <Icon v-if="$colorMode.preference!= 'light'"  name="material-symbols:sunny-outline-rounded" class="text-2xl"  @click="$colorMode.preference= 'light'"/>
   
     </div>
 </template>
 
 <style>
 body {
   background-color: #fff;
   color: rgba(0,0,0,0.8);
 }
 .main-card{
   background-color: rgb(248,249,250);
   color: #7b7c7c;
 }
 .choose{
   color: black;
 }
 .mship{
   color:#7b7c7c ;
 }
 .dark-mode .mship{
   color:white ;
 }
 .dark-mode .choose{
   color: white;
 }
 .dark-mode body {
   background-color: #091a28;
   color: #ebf4f1;
 }
 .dark-mode nav{
   background-color: #0c304d;
   color: white;
 }
 .dark-mode .main-card{
   background-color: #0c304d;
   color: #ebf4f1;
 }
 
 .dark-mode .item-bx{
   background-color: #091a28;
   color: #ebf4f1;
 }
 .dark-mode .options-container{
   color: black;
 }
 
 </style>
