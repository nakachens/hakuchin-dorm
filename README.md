## a visual art dorm!! .✦ ݁˖

This is an interactive app i made in React where YOUR characters live on a fixed 1920×1080 world!!
you can interact with your characters, and drag them around the screen! 
Each character is its own self-contained component! Or you can say, they all are just built different~ muhehe

The canvas scales to fit any screen size automatically, responsivity like they did in old apps!

this project makes me really happy because of these silly character interactions, playing around here and there with them, its such a perfect de-stress method!! 
I SOO LOVE IT!

you can put these silly characters in your own website to add a bit of unique personality and spice things up just right! 

### ★ file structure ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧
 
```
src/
├── App.jsx                  # the universe
├── friends/
│   ├── Monta.jsx            # dormitory where all characters live
│   ├── Miru.jsx             
│   ├── Dore.jsx             
│   ├── Ren.jsx              
│   ├── Kira.jsx            
│   └── Ryucchi.jsx          
└── assets/
    └── Chatbox.jsx          #speech bubble renderer
```

### ★ a lil summary for what each component does! ★
 
 ### ★ App.jsx
 
the entire game universe is a fixed `1920×1080` div! 
instead of resizing it to fit the screen, i pulled out a genius move..

it's SCALED using CSS WAHAHAHAHHA

this resolves SO MANY PROBLEMS! 
~ All character positions are always written in 1920×1080 coordinates! no matter what screen size we are, laptop, pc, tablet, the positions of the characters you set will remain the same !! because the world itself zooms in or out as one unit to fit the screen! this leads to those Letterbox bars which appear on sides or top/bottom when the screen ratio doesn't match but this was my whole goal honestly! it looks very pretty I LOOVEE THE RETRO LOOK (⸝⸝⸝-﹏-⸝⸝⸝)

The scale value is `Math.min(screenWidth / 1920, screenHeight / 1080)` : aka whichever dimension is tighter; wins! so nothing ever gets cropped.
 
The draggable characters receive `scale` as a prop so they can correct mouse movement speed during dragging! its just so that no matter what the screen size is, the dragging feels so smooth and we dont even need to adjust it and work on any complex logic or whatever!

 ### ★ Character components!

these are the actual characters! they are clickable, resulting in super interactive speech bubbles! makes you feel like youre really talking to them! you can add as many dialogues as you like for your own character! and also adjust their position to wherever you want them to spawn on your screen! 
like you can see how i made each room kinda thingy for each character and they spawn to their respective positions, though i can really move them arond here and there~

There are two types of characters you can find in this app!

ᯓ➤ draggable ones : they can be dragged around throughout the screen! you can play around with them, put them at any corner of your screen!

ᯓ➤ non-draggable ones : they cannot be moved, just interacted using click animations! in my case, Kira is non draggable because he's eating!! you shall not interrupt him while he's eating! the same goes for Ryu!! he's falling asleep! dont disturb!!!

### ★ The chatbox component!
It is shared component used by every character to render their dialogues. 
It knows nothing about clicking or dragging or any other thing, it just receives data and renders bubbles~ think of it as a styling component!

### ★ and lastly~ all i want to say is ★
this app was made on a whim because i wanted to try making virtual pets/characters so here we go i guess haha (no wonder the characters names look so random...)

but hey! I didn't knew i would end put putting so much effort into all this lol.. but its sooo worth it ⸜(｡˃ ᵕ ˂ )⸝♡

Its a very simple project, all art and animations are handmade by me and me only in CSP (clip studio paint) (˶ᵔ ᵕ ᵔ˶)! (hope u like it~)

The project tutorial on how to make this is UP on codedex!!! so do check it out !! [HERE](https://www.codedex.io/community/monthly-challenge/submission/5o5VozfORg5cNKQiXF3Z) 
I do hope this helps you out!

hehe thanku 4 reading! have fun~
