"use strict";function slice(e,t,n){switch(arguments.length){case 0:throw"no args";case 1:return slice(e,0,e.length);case 2:return slice(e,t,e.length);default:for(var o=Math.max(0,n-t),r=new Array(o),i=-1;++i<o;)r[i]=e[t+i];return r}}function random(e,t){if(void 0===t)throw new Error("random end must be defined");var n=Math.floor(Math.random()*(t-e+1));return n+=e}function isFunction(e){var t={};return e&&"[object Function]"===t.toString.call(e)}function maybeFun(e){return isFunction(e)?e():void 0}function maybe(e){return function(t){return t?e(t):!1}}function dynamicInvoke(e){return function(t){return t[e](t)}}function randomFrom(e){var t=random(0,e.length-1);return e[t]}function chance(e,t){random(0,100)<e&&t()}function double(e){return 2*e}function randomDirection(){var e=1===random(0,2)?"+":"-";return e}function numberWithCommas(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}function preload(){chatInput=document.getElementById("chatInput"),Assets.preload(game)}function create(){setupStage(),setupTable(),setupAssets(assets),Controls.add(),UI.init(),setupPlayers(),Cursor.set(),Video.init()}function setupStage(){var e=document.getElementById("please_wait");e&&e.remove(),game.stage.disableVisibilityChange=!0,game.scale.scaleMode=Phaser.ScaleManager.RESIZE,game.scale.setScreenSize(!0),game.scale.onResize=UI.update;var t=game.canvas;t.id="boardgame",game.canvas.oncontextmenu=function(e){e.preventDefault()},game.physics.startSystem(Phaser.Physics.ARCADE),game.world.setBounds(0,0,World.width,World.height)}function setupTable(){table=game.add.tileSprite(0,0,World.width,World.height,"table")}function buildAssetArray(e,t){for(var n=[],o=0;t>o;o++)R.times(function(){n.push(o)})(e.counts[o]||1);return n}function setupAssets(e){var t=200,n=1;G.groups.add("tokens"),R.forEach(function(e){t+=150;var o=e.args[0];G.groups.add(o,0,Utils.deg2Rad(e.rotateBy)),"atlasJSONHash"===e.method&&(n=game.cache.getFrameCount(o),addCards(o,t,buildAssetArray(e,n),G.groups.get(o))),"image"===e.method&&addTokens(R.repeatN(o,e.counts||n),G.groups.get(o),100,t),"spritesheet"===e.method&&(n=e.args[4],e.isDice?R.times(function(){Dice.add(o,G.groups.get(o),n)})(e.counts[0]||1):addCards(o,t,buildAssetArray(e,n),G.groups.get(o)))})(e)}function addCards(e,t,n,o,r,i){i=i||1;var a,s=[],d=0;return R.forEach(function(n){n===a?d-=3:d=0;var c=o.create(100+120*n,t+d,e,n);c.defaultFrame=n,r&&r.config.hidden&&T.hide(c),T.scale(i,c),T.setDefaultTint(15658734,c),R.compose(T.setId,Cursor.reset,T.networkAble,T.stackable,T.rotateable(o.rotateBy),T.draggable,T.centerAnchor)(c),s.push(c.id),Controls.target=c,a=n})(n),Controls.target}function addTokens(e,t,n,o,r,i){r=r||16777215,n=n||100,o=o||300,i=i||1,R.forEach.idx(function(e,a){var s=t.create(n+a,o-3*a,e);T.setId(s),T.scale(i,s),T.setDefaultTint(r,s),R.compose(Cursor.reset,T.networkAble,T.rotateable(t.rotateBy),T.draggable,T.centerAnchor)(s)})(e)}function setupPlayers(){UI.updateNames(),players=game.add.group(),players.z=17,player={cursor:cursorId,name:playerName}}function update(){if(Network.ready!==!1){G.update();var e={x:Math.floor(game.input.activePointer.worldX),y:Math.floor(game.input.activePointer.worldY)};if(game.input.keyboard.isDown(Phaser.Keyboard.UP))game.camera.y-=30;else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN))game.camera.y+=30;else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))game.camera.x-=30;else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))game.camera.x+=30;else if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)&&chatInput.value.length>0){var t=chatInput.value;chatInput.value="",Network.server.chat(t)}game.input.mouse.event&&(game.input.mouse.event.wheelDeltaX&&(game.camera.x-=game.input.mouse.event.wheelDeltaX),game.input.mouse.event.wheelDeltaY&&(game.camera.y-=game.input.mouse.event.wheelDeltaY)),player.lastPosition&&player.lastPosition.x==e.x&&player.lastPosition.y==e.y||(Network.server.moveCursor(e),player.lastPosition=e)}}var Assets={};Assets.preload=function(e){var t=R.range(1,55);R.forEach(function(t){e.load.image("cursor"+t,"/img/cursors/"+t+".png")})(t),e.load.image("table","/assets/table_low.jpg"),e.load.image("rotate","/assets/rotate.png"),e.load.spritesheet("button","/assets/button_sprite_sheet.png",193,71),R.forEach(function(t){e.load[t.method].apply(e.load,t.args)})(assets)};var Controls={},cursors;Controls.add=function(){Controls.controls=game.add.group(),Controls.controls.position.set(-100);var e=Controls.controls.create(0,0,"rotate");e.scale.set(.7),T.centerAnchor(e),e.inputEnabled=!0,e.input.useHandCursor=!0,e.events.onInputUp.add(T.onRotate),Cursor.reset(e)},Controls.at=function(e){Controls.controls.visible=!0,Utils.toCorner(Controls.controls,e)},Controls.hide=function(e){e?Controls.target===e&&(Controls.controls.visible=!1):Controls.controls.visible=!1},Controls.cursors=function(){game.input.keyboard.createCursorKeys()};var Cursor={};Cursor.new=function(e){var t=players.create(0,0,"cursor"+e.cursor);return t.name=e.name,t.addChild(game.add.text(40,0,e.name,{font:"26px Arial",fill:"#fff"})),Cursor.set(),t},Cursor.set=function(){game.canvas.setAttribute("style","cursor: url(/img/cursors/"+cursorId+".png), auto;")},Cursor.reset=function(e){return e.events.onInputOut.add(Cursor.set),e};var Dice={};Dice.add=function(e,t,n,o){o=o||16777215;var r=t.create(100+80*t.children.length,100,e);return t.numSides=n,r.animations.add("spin",R.range(0,n)),r.play("spin",30),r.animations.currentAnim.setFrame(0,!0),T.draggable(r),r.tint=o,Dice.spinnable(r),Cursor.reset(r),T.setId(r),T.networkAble(r),r},Dice.spin=function(e,t,n){R.forEach.idx(function(e,o){var r=G.findTile(e),i=t[o],a=n[o];r.play("spin",100,!0),setTimeout(function(){r.animations.stop(null,!1),r.frame=a},i-200),game.add.tween(r).to({rotation:i/20},i,Phaser.Easing.Cubic.Out,!0,0,!1)})(e)},Dice.onSpinClicked=function(e){var t=R.pluck("id")(e.parent.children);if("test"===mode){var n=R.map(function(){return Math.floor(300+567*Math.random())})(t),o=R.map(function(){return Math.floor(Math.random()*e.parent.numSides)})(t);Dice.spin(t,n,o)}else Network.server.spin(t,e.parent.numSides)},Dice.spinnable=function(e){e.anchor.set(.4),e.events.onInputUp.add(Dice.onSpinClicked,this)};var G={};G._groups={},G.groups={add:function(e,t,n){t=t||0,n=n||0,G._groups[e]=game.add.group(),G._groups[e].z=t,G._groups[e].rotateBy=n},get:function(e){return G._groups[e]},all:function(){return G._groups}},G.init=function(e){G.button=R.converge(e.add.button,R.always(0),R.always(0),R.always("button"),R.I,R.argN(1),R.always(1),R.always(0),R.always(2)).bind(e.add)},G.addText=R.curryN(2,function(e,t,n,o){o=o||"#ccc";var r=game.add.text(20,20,e,{fontSize:"32px",fill:o});return n&&n(r,t),t.setText=r.setText.bind(r),t.addChild(r),t}),G.updatePositions=[],G.update=function(){R.forEach(function(e){Utils.alignPosition(e.follower,e.target)})(G.updatePositions)},G.addUpdatePosition=function(e){G.updatePositions.push(e)},G.removeUpdatePosition=function(e){G.updatePositions=R.reject(R.propEq("target",e))(G.updatePositions)},G.findTile=function(e){e=Number(e);var t;return R.mapObj(function(n){t=R.find(R.propEq("id",e))(n.children)||t})(G.groups.all()),t?t:{}},G.findStack=function(e){e=Number(e);var t=R.find(R.propEq("id",e))(stacks.children);return t?t:{}},G.saveSetup=function(){Network.server.saveSetup(),UI.message("Saved setup",gameName)};var Network={};Network.ready=!1,Network.isMine=function(e){return Network.myId===e},Network.setup=function(){Network.client=new Eureca.Client,Network.client.ready(function(e){Network.server=e}),Network.client.exports.setId=function(e){Network.myId=e,Network.server.handshake(e,cursorId,playerName,roomName,mode),create(),Network.ready=!0},Network.client.exports.kill=function(e){playerList[e.id]&&(playerList[e.id].kill(),delete playerList[e.id],UI.message(e.name,"left the table..."),UI.updateNames()),Video.killClient(e.id,e.name)},Network.client.exports.spawnPlayer=function(e,t){if(!Network.isMine(e.id)){var n=Cursor.new(e);playerList[e.id]=n,UI.message(e.name,"joined the table!"),UI.updateNames(),Video.newClient(e.id,e.name)}},Network.client.exports.updateCursor=function(e,t){Network.isMine(e.id)||playerList[e.id]&&(playerList[e.id].x=t.x,playerList[e.id].y=t.y)},Network.client.exports.dragTile=function(e,t){if(!Network.isMine(e.id)){var n=G.findTile(t);n.defaultFrame&&T.show(n),Controls.hide(n),G.addUpdatePosition({follower:n,target:playerList[e.id]})}},Network.client.exports.positionTile=function(e,t,n){if(Network.isMine(e.id)){var o=G.findTile(t);Controls.hide(o),R.compose(T.enableInput,T.show)(o),Utils.alignPosRot(o,n),UI.message("Positioning tile",t)}},Network.client.exports.dropTile=function(e,t,n){var o=G.findTile(t);S.removeCardFromStacks(t),Network.isMine(e.id)||(Controls.hide(o),UI.message(e.name,"moved tile",o.id),G.removeUpdatePosition(playerList[e.id]),Utils.alignPosRot(o,n))},Network.client.exports.dragStack=function(e,t){if(!Network.isMine(e.id)){var n=G.findStack(t);n.remoteDragged=!0,G.addUpdatePosition({follower:n,target:playerList[e.id]})}},Network.client.exports.dropStack=function(e,t,n){if(!Network.isMine(e.id)){var o=G.findStack(t);G.removeUpdatePosition(playerList[e.id]),o.remoteDragged=!1,Utils.alignPosRot(o,n),S.tidy(o),UI.message(e.name,"moved stack",t)}},Network.client.exports.positionStack=function(e,t,n){if(Network.isMine(e.id)){var o=G.findStack(t);Utils.alignPosRot(o,n.position),S.updateCards(o,n.cards),S.alignElements(o),UI.message("Positioning stack",t)}},Network.client.exports.updateStackCards=function(e,t,n){G.removeUpdatePosition(playerList[e.id]);var o=G.findStack(t);S.updateCards(o,n)},Network.client.exports.flipStack=function(e,t){var n=G.findStack(t);S.flipCards(n)},Network.client.exports.spin=function(e,t,n,o){Dice.spin(t,n,o),UI.message("Spinning",t.length,"dice")},Network.client.exports.receiveChat=function(e,t){UI.message(e.name,":",t)}};var S={};S.offsetX=1.2,S.offsetY=-1,S.create=function(e){var t=T.centerAnchor(stacks.create(0,0,e.image));t.width=280,t.height=280,t.align=[],t.config=e,T.draggable(t),t.input.useHandCursor=!1,t.events.onInputDown.add(S.onDragStack),t.events.onInputUp.add(S.onDropStack),T.setId(t),t.cards=[],t.position.set(e.x,e.y),G.addText("0",t,Utils.childTo(0,.78),"#3b74aa");var n=R.compose(Cursor.reset,S.align(t),Utils.aboveCorner(t),S.assign(t),T.scale(.4));return e.shuffle&&R.compose(n,G.addText("SHUFFLE"))(UI.handCursor(G.button(S.onShuffleButton,t))),e.hidden||R.compose(n,G.addText("FLIP"))(UI.handCursor(G.button(S.onFlipButton,t))),t},S.align=R.curry(function(e,t){var n=R.last(e.align);return e.align.push(t),n&&(t.x+=n.width*(e.align.length-1)),S.assignRelativePosition(e,t)}),S.assignRelativePosition=function(e,t){return t.relativePosition?t:(t.relativePosition={x:t.x-e.x,y:t.y-e.y},t)},S.assign=R.curry(function(e,t){return t.stack=e,t}),S.onDragStack=function(e){Network.server.stackDragStart(e.id),Controls.hide()},S.onDropStack=function(e){var t=e.position.clone();t.width=e.width,t.height=e.height,Network.server.stackDragStop(e.id,t),S.tidy(e)},S.onShuffleButton=function(){var e=this;Network.server.shuffleStack(e.id)},S.onFlipButton=function(e){var t=e.stack;Network.server.flipStack(t.id)},S.bringToTop=function(e){return e.bringToTop(),e},S.tidy=function(e){var t;return R.forEach.idx(function(n,o){var r=G.findTile(n);r.inputEnabled=!1,Utils.alignPosition(r,S.calculateCardPos(e,o)),e.config.hidden&&T.hide(r),r&&(t=r),S.bringToTop(r)})(e.cards),t&&(t.inputEnabled=!0),t&&UI.handCursor(t),S.alignElements(e),S.updateCounter(e)},S.overlap=R.curry(function(e,t){return game.physics.arcade.overlap(e,t)}),S.flipCards=function(e){R.forEach(function(e){var t=G.findTile(e);0===t._frame.index?T.show(t):T.hide(t)})(e.cards)},S.update=function(){stacks.forEach(function(e){(e.input.isDragged||e.remoteDragged)&&(S.alignElements(e),S.alignStackCards(e))})},S.calculateCardPos=function(e,t){return{x:e.x+S.offsetX*t,y:e.y+S.offsetY*t}},S.alignStackCards=function(e){R.forEach.idx(function(t,n){var o=G.findTile(t);o.inputEnabled=!1,Utils.alignPosition(o,S.calculateCardPos(e,n))})(e.cards)},S.alignElements=function(e){R.forEach(S.moveRelativeTo(e))(e.align)},S.moveRelativeTo=R.curry(function(e,t){return t.relativePosition?(t.x=e.x+t.relativePosition.x,t.y=e.y+t.relativePosition.y,t):t}),S.updateCounter=function(e){return e.setText(e.cards.length),e},S.updateCards=function(e,t){if(e&&t){var n=R.difference(t,e.cards);R.forEach(S.removeCardFromStacks)(n),e.cards=t,n.length?R.forEach(function(t){var n=G.findTile(t),o=game.add.tween(n).to(e.position,200,Phaser.Easing.Cubic.In,!0,0,!1);o.onComplete.add(function(){S.tidy(e)})})(n):S.tidy(e)}},S.removeCardFromStacks=function(e){var e=Number(e);return R.forEach(function(t){t.cards=R.reject(R.eq(e))(t.cards),S.tidy(t)})(stacks&&stacks.children||[]),e};var T={};T.id=0,T.centerAnchor=function(e){return e.anchor.set(.5),e},T.draggable=function(e){return e.controls=e.controls||game.add.group(),e.inputEnabled=!0,e.input.enableDrag(!1,!0),e.input.useHandCursor=!0,game.physics.arcade.enable(e),e.body.collideWorldBounds=!0,e},T.networkAble=function(e){return e.events.onInputDown.add(T.onStartDrag),e.events.onInputUp.add(T.onStopDrag),e},T.stackable=function(e){return e.stackable=!0,e},T.scale=R.curry(function(e,t){return t.scale.set(e),t}),T.setId=function(e){return e.id=T.id++,e},T.resetRotation=function(e){return e.rotation=0,e},T.rotateable=function(e){return e?function(e){return e.rotateable=!0,e.events.onInputDown.add(T.onStartDragRotate),e.events.onInputUp.add(T.onStopDragRotate),e}:R.I},T.onRotate=function(){var e=Controls.target.parent.rotateBy;if(e){var t=Controls.target.position.clone();t.rotation=Controls.target.rotation+e,Network.server.tileDragStop(Controls.target.id,t),game.add.tween(Controls.target).to({rotation:"+"+e},50,Phaser.Easing.Linear.None,!0,0,!1)}},T.defaultTint=function(e){return e.tint=e.defaultTint,e},T.setDefaultTint=function(e,t){return t.defaultTint=t.tint=e,t},T.resetTint=function(e){return e.tint+=3355443,e},T.onStartDrag=function(e){Controls.hide(),Network.server.tileDragStart(e.id)},T.onStopDrag=function(e){var t=e.position.clone();t.rotation=e.rotation,Network.server.tileDragStop(e.id,t)},T.onStartDragRotate=function(e){Controls.target=e,T.show(e),Controls.hide()},T.onStopDragRotate=function(e){Controls.at(e)},T.enableInput=function(e){return e.inputEnabled=!0,e},T.show=function(e){return e.frame=e.defaultFrame,e},T.hide=function(e){return e.frame=0,e};var UI={};UI.lines=[],UI.init=function(){UI.gameText=game.add.text(0,0,gameName.split("").join(" "),{font:"bold 32px Times",fill:"#ccc"}),UI.nameText=game.add.text(0,0,"----------------\nNAME:"+playerName,{font:"bold 22px Times",fill:"#ccc"}),UI.nameText.align="right",UI.messageText=game.add.text(0,0,"Messages:",{font:"22px Times",fill:"#ccc"}),UI.messageText.align="right",UI.textElements=[UI.gameText,UI.nameText,UI.messageText],UI.update()},UI.update=function(){R.forEach(UI.fixedToCamera(!1))(UI.textElements),UI.gameText.x=UI.nameText.x=UI.messageText.x=game.canvas.width-400,UI.gameText.y=16,UI.nameText.y=46,UI.messageText.y=260,R.forEach(UI.fixedToCamera(!0))(UI.textElements)},UI.fixedToCamera=R.curry(function(e,t){return t.fixedToCamera=e,t}),UI.handCursor=function(e){return e.input.useHandCursor=!0,e},UI.message=function(){var e=R.join(" ",slice(arguments));e=e.match(/.{1,30}/g),UI.lines=R.concat(e,UI.lines),UI.lines.length>15&&UI.lines.pop(),UI.messageText.setText("-> "+R.join("\n")(UI.lines)+"\n...")},UI.setNames=function(e){UI.nameText.setText(R.join("-",new Array(3*gameName.length))+"\nTable: "+roomName+"\n"+R.join("\n")(e))},UI.updateNames=function(){UI.setNames(R.concat(["* "+playerName+" *"],R.pluck("name",R.values(playerList))))};var Utils={humanize:function(e,t,n){return R.align(ifLte,R.interpolate(e,t,n.length),n)},alignPosition:function(e,t){e&&t&&(e.x=t.x,e.y=t.y)},alignPosRot:function(e,t){e&&t&&(e.x=t.x,e.y=t.y,e.rotation=t.rotation)},toCorner:function(e,t){e&&t&&(e.x=t.x-t.width/2,e.y=t.y-t.height/2)},childTo:function(e,t){return function(n,o){n&&o&&(n.x=o.width*e,n.y=o.height*t)}},aboveCorner:R.curry(function(e,t){return t&&e&&(t.x=e.x-e.width/2,t.y=e.y-e.height/2-t.height),t}),delta:function(e,t){return{x:e.x-t.x,y:e.y-t.y}},shuffle:function(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),o=e[t];e[t]=e[n],e[n]=o}return e},printargs:function(){return arguments[0]},buttonize:function(e,t){return e.interactive=!0,e.buttonMode=!0,e.defaultCursor="pointer",e.click=e.tap=t,e},angle:function(e){return Math.atan2(e.y,e.x)},angle2points:function(e,t){return R.compose(Utils.angle,Utils.delta)(e,t)},rad2Deg:function(e){var t=180*e/Math.PI;return 0>t&&(t+=360),t},deg2Rad:function(e){0>e&&(e+=360);var t=e/180*Math.PI;return t},addProperties:function(e,t){return R.forEach(function(n){e[n]=t[n]})(R.keys(t)),e},rotate90:function(e){return e+Math.PI/2},removeFromArray:R.curry(function(e,t){return t&&t.length>0&&t.splice(t.indexOf(e),1),e}),removeChildren:function(e){R.times(function(){e.children.length&&e.getChildAt(0)&&e.removeChild(e.getChildAt(0))},e.children.length)},move:function(e){var t,n,o=e.rotation,r=e.speed;return t=Math.cos(o)*r,n=Math.sin(o)*r,e.position.set(e.x+t,e.y+n),e},center:function(e,t){e.x=t.x+(t.width-e.width)/2,e.y=t.y+(t.height-e.height)/2},testHitArray:function(e,t){return function(n){for(var o=t.length-1;o>=0;o-=1)Utils.testHit(n,t[o],e);return n}},testHit:function(e,t,n){Utils.collidesRectCircle(e,t)&&n(e,t)},testNearMissArray:function(e,t){return function(n){for(var o=t.length-1;o>=0;o-=1)Utils.testNearMiss(n,t[o],e);return n}},testNearMiss:function(e,t,n){Utils.collidesRectCircle(e,t,t.nearMissRadius)&&n(t)},pointIntersection:function(e,t){return e.x>t.x&&e.x<t.x+t.width&&e.y>t.y&&e.y<t.y+t.height},simpleIntersection:function(e,t){return!(t.x>e.x+e.width||t.x+t.width<e.x||t.y>e.y+e.height||t.y+t.height<e.y)},getPowDistance:function(e,t,n,o){var r=Math.abs(e-n),i=Math.abs(t-o);return r*r+i*i},collidesRectCircle:function(e,t,n){var o=n||.5*t.width,r=.75*Math.max(e.width,e.height);if(Math.abs(t.x-e.x)<o+r&&Math.abs(t.y-e.y)<o+r){var i,a,s=e.rotation>0?-1*e.rotation:-1*e.rotation+Math.PI,d=Math.cos(s)*(t.x-e.x)-Math.sin(s)*(t.y-e.y)+e.x,c=Math.sin(s)*(t.x-e.x)+Math.cos(s)*(t.y-e.y)+e.y,u=e.x-.5*e.width,l=e.y-.5*e.height;i=u>d?u:d>u+e.width?u+e.width:d,a=l>c?l:c>l+e.height?l+e.height:c;var f=this.getPowDistance(d,c,i,a);if(o*o>f)return!0}return!1},doPolygonsIntersect:function(e,t){var n,o,r,i,a,s,d,c,u=[e,t];for(i=0;i<u.length;i++){var l=u[i];for(a=0;a<l.length;a++){var f=(a+1)%l.length,p=l[a],g=l[f],h={x:g.y-p.y,y:p.x-g.x};for(n=o=void 0,s=0;s<e.length;s++)r=h.x*e[s].x+h.y*e[s].y,(isUndefined(n)||n>r)&&(n=r),(isUndefined(o)||r>o)&&(o=r);for(d=c=void 0,s=0;s<t.length;s++)r=h.x*t[s].x+h.y*t[s].y,(isUndefined(d)||d>r)&&(d=r),(isUndefined(c)||r>c)&&(c=r);if(d>o||n>c)return CONSOLE("polygons don't intersect!"),!1}}return!0}},Video={};Video.existingCalls=[],navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia,Video.newPeerServerConnection=function(){Video.peer=new Peer(Network.myId,{key:"8z62zmz8keasjor",debug:1,iceServers:[{url:"stun:stun.l.google.com:19302"}]})},Video.init=function(){$("#video-container").show(),Video.newPeerServerConnection(),Video.peer.on("open",function(e){Video.id=e}),Video.peer.on("call",function(e){e.answer(window.localStream),Video.step3(e)}),Video.peer.on("error",function(e){if(/Could not connect to peer (\w+)/.exec(e.message)){var t=/Could not connect to peer (\w+)/.exec(e.message)[1];Video.step2(t)}else Video.newPeerServerConnection()}),$(function(){$("#step1-retry").click(function(){$("#step1-error").hide(),Video.step1()}),Video.step1()})},Video.newClient=function(e,t){e&&(Video.addVideo(e),$("#"+e).find(".step3").hide(),$("#"+e).find(".make-call").text("Call "+t),$(function(){$("#"+e).find(".make-call").click(function(){var e=$(this).parents("div.video-group").attr("id"),t=Video.peer.call(e,window.localStream);Video.step3(t)}),$("#"+e).find(".end-call").click(function(){$(this).parents("div.video-group").attr("id");Video.existingCalls[e].close(),Video.step2(e)})}),Video.step2(e))},Video.killClient=function(e){Video.removeVideo(e)},Video.addVideo=function(e){$("#their-videos").append('<div class="video-group" id="'+e+'"><div class="step3"><a href="#" class="btn btn-xs btn-danger end-call">x</a></div><video class="video" style="display: none;" autoplay></video><div class="step step2"><a href="#" class="btn btn-xs btn-success make-call">Call</a></div></div>')},Video.removeVideo=function(e){$("#"+e).remove()},Video.step1=function(){$("#step1-error").hide(),navigator.getUserMedia({audio:!0,video:!0},function(e){$("#my-video").prop("src",URL.createObjectURL(e)),$("#my-video").show(),window.localStream=e,$("#step1").hide()},function(){$("#step1-error").show(),$("#my-video").hide()})},Video.step2=function(e){$("#step1").hide(),$("#"+e).find(".step3").hide(),$("#"+e).find(".step2").show()},Video.step3=function(e){Video.existingCalls[e.peer]&&Video.existingCalls[e.peer].close(),e&&(e.on("stream",function(t){$("#"+e.peer).find("video").show(),$("#"+e.peer).find("video").prop("src",URL.createObjectURL(t))}),e.on("close",function(){$("#"+e.peer).find("video").hide(),Video.step2(e.peer)}),e.on("error",function(){$("#"+e.peer).find("video").hide()}),Video.existingCalls[e.peer]=e,$("#step1").hide(),$("#"+e.peer).find(".step2").hide(),$("#"+e.peer).find(".step3").show())};var Screen={},World={width:4e3,height:2e3};Screen.x=window.innerWidth*window.devicePixelRatio,Screen.y=window.innerHeight*window.devicePixelRatio;var game=new Phaser.Game(Screen.x,Screen.y,Phaser.CANVAS,"boardgame",{preload:preload,create:Network.setup,update:update}),redDice,stacks,players,table,playerList={},player={},stack1,stack2,chatInput,screenShot=function(){window.open(game.canvas.toDataURL())};