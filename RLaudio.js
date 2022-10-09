let init = function(fillBuffer) {
    
}

let swap = function (currPlayer,A,B,C,D) {
    //A end routine
    let Aended = function () {

        //console.log("Aended");

        //console.log(currPlayer);

        //play B
        if (currPlayer != "None") {
            //console.log("BStart");
            B.start();
            currPlayer = "B";
        }


        //recreate myself
        A = C.createBufferSource();

        //create my new buffer
        let buffer = C.createBuffer(
            1,
            SAMPLE_RATE * timeLength,
            SAMPLE_RATE
        );

        //fill the buffer
        fillBuffer(buffer);

        //assign the buffer
        A.buffer = buffer;

        A.connect(D)

        //event on ended
        A.addEventListener("ended", Aended);


    }

    //B end routine
    let Bended = function () {

        //console.log("Bended");

        //play A
        if (currPlayer != "None") {
            //console.log("AStart");
            A.start();
            currPlayer = "A";
        }


        //recreate myself
        B = C.createBufferSource();

        //create my new buffer
        let buffer = C.createBuffer(
            1,
            SAMPLE_RATE * timeLength,
            SAMPLE_RATE
        );

        //fill the buffer
        fillBuffer(buffer);

        //assign the buffer
        B.buffer = buffer;

        B.connect(D)

        //event on ended
        B.addEventListener("ended", Bended);
    }

    if (currPlayer == "A") {
        Aended();
    } else if (currPlayer == "B") {
        Bended();
    }
}