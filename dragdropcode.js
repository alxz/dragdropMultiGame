
    var correctCards = 0;
    var objectId = 0;
    $( init );
    var arrObjects = [
        {
        'imgSrc' : '<img src="img/confidentialPapers.png" alt="confidentialPapers" width="180" height="160">',
            'imgDest1' :  '<img src="img/computer-desk-table.png" alt="computer-desk" width="180" height="180">',
            'imgDest2' :  '<img src="img/drawerLocker.png" alt="drawerLocker" width="180" height="180">',
            'txtDest1' :  '<h3>Office Desk</h3>',
            'txtDest2' :  '<h3>Drawer With Lock</h3>',
            'backgColor' : '#ec9b9b',
            'correctDest' : 2
        },
        {
            'imgSrc' : '<img src="img/confidentialPapers.png" alt="confidentialPapers" width="180" height="160">',
            'imgDest1' :  '<img src="img/desktopPrinter.png" alt="desktopPrinter" width="180" height="180">',
            'imgDest2' :  '<img src="img/kyoceraFollowMe.png" alt="kyoceraFollowMe" width="180" height="180">',
            'txtDest1' :  '<h3>Office Printer</h3>',
            'txtDest2' :  '<h3>Kyocera FloowMe Printer</h3>',
            'backgColor' : '#abcbf5',
            'correctDest' : 2
        },    
        {
        'imgSrc' : '<img src="img/confidentialPapers.png" alt="confidentialPapers" width="180" height="160">',
            'imgDest1' :  '<img src="img/paper-shredder.png" alt="paper-shredder" width="180" height="180">',        
            'imgDest2' :  '<img src="img/rubbish-waste-paper.png" alt="rubbish-waste" width="180" height="180">',
            'txtDest1' :  '<h3>Shredder for Paper</h3>',
            'txtDest2' :  '<h3>Office Waste Bin</h3>',
            'backgColor' : '#abddec',
            'correctDest' : 1        
        }

        
    ];

    function init() {
        //set initial images:
        var docImg = arrObjects[objectId].imgSrc;    
        var imgDest1 = arrObjects[objectId].imgDest1;  
        var imgDest2 = arrObjects[objectId].imgDest2;
        var correctDestId = arrObjects[objectId].correctDest;
        var txtDest1 = arrObjects[objectId].txtDest1;
        var txtDest2 = arrObjects[objectId].txtDest2;
        var backColor = arrObjects[objectId].backgColor;
    //show background div:
    $('#backgroundDiv').show();      
        
    // show game selector:
    $('#selectGame').show();     
    $('#successMessage').hide();  // Hide the success message  
    $('#failedMessage').hide(); // Hide the failure message
    //setting correct css props for success messages
    $('#successMessage').css( {
        left: '85%',
        top: '250px',
        width: 0,
        height: 0
    } );
    //setting correct css props for failure messages  
    $('#failedMessage').css( {
        left: '85%',
        top: '250px',
        width: 0,
        height: 0
    } );

    // Reset the game
    correctCards = 0;
    failedTurn = 0;
    $('#cardPile').html( '' );
    $('#cardSlots').html( '' );
    $("#content").css("background-color", backColor);
    // Create the pile of shuffled cards
    $('<div>' + '' + '</div>').data( 'number', 10 ).attr( 'id', 'emptyCard'+0 ).appendTo( '#cardPile' ); // empty slot
    $('<div>' + '' + '</div>').data( 'number', 11 ).attr( 'id', 'emptyCard'+1 ).appendTo( '#cardPile' ); // empty slot
    $('<div>' + docImg + '</div>').data( 'number', correctDestId ).attr( 'id', 'card'+1 ).appendTo( '#cardPile' ).draggable( {
        containment: '#content',
        stack: '#cardPile div',
        cursor: 'move',
        revert: true
        } );
    $('<div>' + '' + '</div>').data( 'number', 12 ).attr( 'id', 'emptyCard'+2 ).appendTo( '#cardPile' ); // empty slot
    $('<div>' + '' + '</div>').data( 'number', 13 ).attr( 'id', 'emptyCard'+3 ).appendTo( '#cardPile' ); // empty slot  

    // Create the card slots
    $('<div>' + ' ' + '</div>').data( 'number', 100 ).appendTo( '#cardSlots' );  
    $('<div>' + imgDest1 + txtDest1 + '</div>').data( 'number', 1 ).appendTo( '#cardSlots' ).droppable( {
        accept: '#cardPile div',
        hoverClass: 'hovered',
        drop: handleCardDrop
        } );
    // for ( var i=1; i<=2; i++ ) {
    //   $('<div>' + ' ' + '</div>').data( 'number', 100 + i ).appendTo( '#cardSlots' ).droppable( {
    //     accept: '#cardPile div',
    //     hoverClass: 'hovered'
    //   } );
    // }
    $('<div>' + ' ' + '</div>').data( 'number', 102 ).appendTo( '#cardSlots' );
    $('<div>' + imgDest2 + txtDest2 + '</div>').data( 'number', 2 ).appendTo( '#cardSlots' ).droppable( {
        accept: '#cardPile div',
        hoverClass: 'hovered',
        drop: handleCardDrop
        } );

        $('<div>' + ' ' + '</div>').data( 'number', 103 ).appendTo( '#cardSlots' );    
    }

    function handleCardDrop( event, ui ) {
        var slotNumber = $(this).data( 'number' );
        var cardNumber = ui.draggable.data( 'number' );

        // If the card was dropped to the correct slot,
        // change the card colour, position it directly
        // on top of the slot, and prevent it being dragged
        // again  
        if ( slotNumber == cardNumber ) { 
            ui.draggable.addClass( 'correct' );
            ui.draggable.draggable( 'disable' );
            $(this).droppable( 'disable' );
            ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
            ui.draggable.draggable( 'option', 'revert', false );
            correctCards++;
        }  else {
            // if this is incorrect card dropped:
            ui.draggable.addClass( 'incorrect' );
            //ui.draggable.draggable( 'disable' );
            //$(this).droppable( 'disable' );
            //ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
            //ui.draggable.draggable( 'option', 'revert', false );
            $('#failedMessage').show();
            $('#failedMessage').animate( {
                left: '35%',
                top: '200px',
                width: '400px',
                height: '100px',
                opacity: 1
            } );
        }
        // If all the cards have been placed correctly then display a message
        // and reset the cards for another go
        if ( correctCards == 1 ) {
            $('#successMessage').show();
            $('#successMessage').animate( {
            left: '35%',
            top: '200px',
            width: '400px',
            height: '100px',
            opacity: 1
            } );
            // parameters: 
            //   left: '380px',
            //   top: '200px',
            //   width: '400px',
            //   height: '100px',
            //   opacity: 1
        }
    }

    function clearWrongDrop() {
        $('#successMessage').hide();  // Hide the success message  
        $('#failedMessage').hide(); // Hide the failure message
        //setting correct css props for success messages
        $('#successMessage').css( {
            left: '85%',
            top: '250px',
            width: 0,
            height: 0
        } );
        //setting correct css props for failure messages  
        $('#failedMessage').css( {
            left: '85%',
            top: '250px',
            width: 0,
            height: 0
        } );
        $('#card1').removeClass( 'incorrect' );
    }

    function leftTopColMsg() {   
        //   $("#rightTopColMsg").click(function(){
        //     $("#selectGame").hide();
        // });
        objectId=0;
        init();
        $("#selectGame").hide();  
        $('#backgroundDiv').hide();
      }
      function clickTopRight() { 
        // $( init );  
        objectId=0;
        init();
        $("#selectGame").hide();
        $('#backgroundDiv').hide();
      }
      function leftBotColMsg() { 
        // $( init );  
        objectId=1;
        init();
        $("#selectGame").hide();
        $('#backgroundDiv').hide();
      }
      function rightBotColMsg() { 
        // $( init );  
        objectId=2;
        init();
        $("#selectGame").hide();
        $('#backgroundDiv').hide();  
      }

