var freq = 220;

var phase = 0;

var SAMPLE_RATE;

function fillBuffer(buffer) {
    //fill stuff etc
    let data = buffer.getChannelData(0);

    //noise
    for (let i = 0; i < buffer.length; i++) {
        data[i] = Math.sin(phase);

        phase += 2 * Math.PI * freq / SAMPLE_RATE;
    }

}

//TODO:
//port this stuff to RLaudio
//to be used in a library manner

addEventListener("load", () => {
    let btn = document.getElementById("play_id");

    //global audio context
    var audioContext = new AudioContext();
    
    //volume controll
    var primaryGainControl = audioContext.createGain();
    primaryGainControl.gain.setValueAtTime(0.05, 0);
    primaryGainControl.connect(audioContext.destination);
    
    SAMPLE_RATE = audioContext.sampleRate;
    const timeLength = 1;

    
    var AudioplayerA = audioContext.createBufferSource();
    var AudioplayerB = audioContext.createBufferSource();
    
    //connecto to Gain control
    AudioplayerA.connect(primaryGainControl)
    AudioplayerB.connect(primaryGainControl)
    
    //val: A, B, None
    var currPlayer = "None";
    
    //wrapper on the swap function
    function Wswap(){
        swap(currPlayer,AudioplayerA,AudioplayerB,audioContext,primaryGainControl);
    }

    AudioplayerA.addEventListener("ended", Wswap);
    AudioplayerB.addEventListener("ended", Wswap);
    
    //init fill A
    let buffer = audioContext.createBuffer(
        1,
        SAMPLE_RATE * timeLength,
        SAMPLE_RATE
        );
        
    //fill the buffer
    fillBuffer(buffer);

    //assign the buffer
    AudioplayerA.buffer = buffer;

    //init fill B
    buffer = audioContext.createBuffer(
        1,
        SAMPLE_RATE * timeLength,
        SAMPLE_RATE
    );

    //fill the buffer
    fillBuffer(buffer);

    //assign the buffer
    AudioplayerB.buffer = buffer;


    btn.addEventListener("click", () => {
        if (currPlayer == "None") {
            AudioplayerA.start();
            currPlayer = "A";
        } else {
            //stop playing

            if (currPlayer == "A") {
                AudioplayerA.stop()
            }

            if (currPlayer == "B") {
                AudioplayerB.stop()
            }

            currPlayer = "None";

        }
    });

    /* 
    const audioContext = new AudioContext();

    //sample rate of the context
    const SAMPLE_RATE = audioContext.sampleRate;
    //time of the buffer
    const timeLength = 1;

    const buffer = audioContext.createBuffer(
        1,
        SAMPLE_RATE * timeLength,
        SAMPLE_RATE
    );

    //left?
    let channelData = buffer.getChannelData(0);

    var freq = 220;

    var phase = 0;
    //noise
    for (let i = 0; i < buffer.length; i++) {
        channelData[i] = Math.sin(phase);

        phase += 2 * Math.PI * freq / SAMPLE_RATE
    }

    //audio node for the noise buffer
    let whiteNoiseSource = audioContext.createBufferSource();
    whiteNoiseSource.buffer = buffer;

    //gain to lower the volume
    let primaryGainControl = audioContext.createGain();
    primaryGainControl.gain.setValueAtTime(0.05, 0);

    //connect the noise to the volume controller (gain)
    whiteNoiseSource.connect(primaryGainControl);

    //connect the  gain to the audio context destination
    primaryGainControl.connect(audioContext.destination);


    btn.addEventListener("click", () => {
        whiteNoiseSource.start();

        whiteNoiseSource.addEventListener("ended", () => {
            whiteNoiseSource = audioContext.createBufferSource();

            const buffer = audioContext.createBuffer(
                1,
                SAMPLE_RATE * timeLength,
                SAMPLE_RATE
            );

            let channelData = buffer.getChannelData(0);

            for (let i = 0; i < buffer.length; i++) {
                channelData[i] = Math.sin(phase);

                phase += 2 * Math.PI * freq / SAMPLE_RATE
            }

            whiteNoiseSource.buffer = buffer;
            whiteNoiseSource.connect(primaryGainControl);

            whiteNoiseSource.addEventListener("ended",this);

            whiteNoiseSource.start();

        });

    });
    */
});