//Display joined hangouts
        let roomArray = ["wow", "room1", "no"];
        //iterates through user's rooms list
        for (let i = 0; i < roomArray.length; i++) {
           
                    $('#rooms-list').append('<div class="card" style="width: 18rem;"><div class="card-body"><h5 class="card-title">' + roomArray[i] + '</h5><div id="interactions"><input type="button" class="btn btn-light btn-sm" value ="Join" onclick ="joinRoom(' + "'" + roomArray[i] + "'" + ')"></div></div></div>');
        }
