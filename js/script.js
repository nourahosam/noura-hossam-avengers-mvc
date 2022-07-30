let model = {
    currentAvenger: {},
    admin:false,
    avengers: [{"name": "Batman",
    "url": "./images/batman.webp",
    "counter": 0},
    {"name": "Superman",
    "url": "./images/superman.jpg",
    "counter": 0},
    {"name": "Iron Man",
    "url": "./images/ironman.jpg",
    "counter": 0}],
}

//model.avengers.currentAvenger = "Batman"

//console.log(model.avengers);


// octupus calls list and display and keeps record of current aven
let Octupus = {
    init: function(){
        model.currentAvenger = model.avengers[0];
        avenList.init();
        //console.log(model.currentAvenger);
        avenDisplay.init();
        admin.render();
        admin.adminState();
        admin.init();
    },
    setAvenger: function(avenger){
        
    },
    getAvenger: function(){
        return model.avengers;
    },
    getCurrentAvenger: function(){
        return model.currentAvenger;
    },
    replaceCurrent: function(newAvenger){
        model.currentAvenger = newAvenger;
    },
    addToCounter: function(){
        model.currentAvenger.counter++;
        avenDisplay.render();
    },
    getAdminState: function () { return model.admin; },
    setAdminState: function(){ model.admin = !model.admin}

}


// controller to return avenger list
let avenList = {
    //returns list
    init: function(){
        let listElem = $('.list ul');
        let avenger = Octupus.getAvenger();
        //console.log('avenLsit' + avenger.length)
        for(let i =0; i < avenger.length; i++){
            let j = avenger[i];
            let avenElem = document.createElement('li');
            avenElem.textContent = j.name;
            listElem.append(avenElem);
            //console.log('for loop');
            $(avenElem).on('click', function (e) {
                Octupus.replaceCurrent(j);
                avenDisplay.render();
            });
        }

    },
    removeList: function(){
        $('li').remove();
    }
}

// controller to display avenger and update avneger
let avenDisplay = {
    // displays and has onclick
    init: function(){
        let avenImage = $('.img');
        $(avenImage).on('click', function(e){
            Octupus.addToCounter();
        });
        avenDisplay.render();
    },
    render: function(){
        let avenName = $('.name');
        let avenImage = $('.img img');
        let avenCounter = $('.counter');
        let current = Octupus.getCurrentAvenger();
        //console.log(current.url);
        avenName.html(current.name);
        avenImage.attr("src", current.url);
        avenCounter.html(current.counter);
        //console.log(avenImage);
    }
}

let admin = {
    init: function(){
        $('form').hide();
    },
    adminState:function(){
        
        //console.log(state);
        $('.admin-state').on('click', function (e) {  
            Octupus.setAdminState();
            let state = Octupus.getAdminState();
            if(state){
                $('form').show();
            }
            else {
                $('form').hide();
            }
        })
    },
    render: function(){
        $('form').submit(function (e) { 
            e.preventDefault();
            let newName = $( 'input[name="name"]' ).val();
            let newImage = $('input[name="image"]').val();
            let newCounter= 0;
            let newAven = {"name": newName, "url" : newImage, "counter": newCounter}
            model.avengers.push(newAven);
            avenDisplay.render();
            avenList.removeList();
            avenList.init();
         })
    }
}

Octupus.init();
//set avenger: pic, name, clicks ---  count el clicks  --- change el avnenger