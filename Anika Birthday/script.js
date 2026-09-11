/* =========================
   ELEMENTS
========================= */

const enterBtn = document.getElementById("enterBtn");

const opening = document.getElementById("opening");
const unlock = document.getElementById("unlock");
const world = document.getElementById("world");
const giftsRoom = document.getElementById("giftsRoom");
const bgMusic = document.getElementById("bgMusic");
const finalRoom = document.getElementById("finalRoom");
const backFromFinal = document.getElementById("backFromFinal");
const memoriesRoom = document.getElementById("memoriesRoom");
const backFromMemories = document.getElementById("backFromMemories");

const inputs = document.querySelectorAll(".code-input");
const codeMessage = document.getElementById("codeMessage");

const worldCards = document.querySelectorAll(".world-card");
const finalCard = document.querySelector(".final-card");
if (finalCard) {

    finalCard.addEventListener("click", () => {

        world.classList.remove("active");

        setTimeout(() => {

            finalRoom.classList.add("active");

        }, 450);

    });

}
if (backFromFinal) {

    backFromFinal.addEventListener("click", () => {

        finalRoom.classList.remove("active");

        setTimeout(() => {

            world.classList.add("active");

        }, 450);

    });

}

const backToWorld = document.getElementById("backToWorld");

const giftBoxes = document.querySelectorAll(".gift-box");

const giftModal = document.getElementById("giftModal");
const closeGift = document.getElementById("closeGift");

const giftRevealContent =
    document.getElementById("giftRevealContent");

const giftProgress =
    document.getElementById("giftProgress");

const giftComplete =
    document.getElementById("giftComplete");


/* =========================
   OPENING → UNLOCK
========================= */

if (enterBtn) {

    enterBtn.addEventListener("click", () => {

        bgMusic.play().catch(() => {});

        opening.classList.remove("active");

        setTimeout(() => {

            unlock.classList.add("active");

            if (inputs.length > 0) {
                inputs[0].focus();
            }

        }, 500);

    });

}


/* =========================
   CODE INPUT
========================= */

inputs.forEach((input, index) => {

    input.addEventListener("input", () => {

        input.value =
            input.value.replace(/\D/g, "");

        if (
            input.value.length === 1 &&
            index < inputs.length - 1
        ) {

            inputs[index + 1].focus();

        }

        checkCode();

    });


    input.addEventListener("keydown", (event) => {

        if (
            event.key === "Backspace" &&
            input.value === "" &&
            index > 0
        ) {

            inputs[index - 1].focus();

        }

    });

});


/* =========================
   CHECK CODE
========================= */

function checkCode() {

    let code = "";

    inputs.forEach(input => {
        code += input.value;
    });


    if (code.length !== 4) {
        return;
    }


    if (code === "0410") {

        codeMessage.textContent =
            "Welcome to your little world. ✨";


        setTimeout(() => {

            unlock.classList.remove("active");

            setTimeout(() => {

                world.classList.add("active");

            }, 500);

        }, 900);


    } else {

        codeMessage.textContent =
            "Hmm... that's not it. Try again.";

        inputs.forEach(input => {
            input.value = "";
        });

        setTimeout(() => {

            inputs[0].focus();

        }, 300);

    }

}


/* =========================
   WORLD CARDS
========================= */

worldCards.forEach(card => {

    card.addEventListener("click", () => {

        const section =
            card.dataset.section;


       if (section === "gifts") {
    openGiftsRoom();

} else if (section === "letter") {
    openLetter();

} else if (section === "game") {
    openLittleGame();
    
} else if (section === "memories") {
    openMemoriesRoom();    

} else {
    alert("This chapter is still being prepared");
}

    });

});


/* =========================
   OPEN GIFTS ROOM
========================= */

function openGiftsRoom() {

    world.classList.remove("active");

    setTimeout(() => {

        giftsRoom.classList.add("active");

    }, 450);

}


/* =========================
   BACK TO WORLD
========================= */

if (backToWorld) {

    backToWorld.addEventListener("click", () => {

        giftsRoom.classList.remove("active");

        setTimeout(() => {

            world.classList.add("active");

        }, 450);

    });

}


/* =========================
   GIFT SYSTEM
========================= */

let openedGifts = new Set();


giftBoxes.forEach(box => {

    box.addEventListener("click", () => {

        const giftNumber =
            box.dataset.gift;


        openGift(giftNumber);


        if (!openedGifts.has(giftNumber)) {

            openedGifts.add(giftNumber);

            box.classList.add("opened");

            updateGiftProgress();

        }

    });

});


/* =========================
   OPEN GIFT
========================= */

function openGift(number) {

    let icon = "🎁";
    let title = "A Little Surprise";
    let content =
        `<p>Something special is waiting here...</p>`;


    /* GIFT 1 */

    if (number === "1") {

        icon = "♡";

        title = "The Beginning";

        content = `

            <div class="memory-intro">

                <p class="memory-line">
                    Every beautiful story has a beginning...
                </p>

                <p class="memory-question">
                    Want to see where it all started?
                </p>

                <button
                    class="reveal-memory-btn"
                    onclick="revealFirstMemory()">

                    Reveal the memory ♡

                </button>

            </div>

        `;

    }


   /* GIFT 2 */

if (number === "2") {

    icon = "💗";

    title = "A Little Game For You";

    content = `

        <div class="game-intro">

            <p class="game-kicker">
                Three little challenges...
            </p>

            <h3 class="game-question">
                Think you can unlock your surprise? 👀💗
            </h3>

            <p class="game-subtext">
                Don't worry, Meriiii Babuuuu...
                I made it cute, not difficult. 🥹✨
            </p>

            <button
                class="game-start-btn"
                onclick="startGiftTwoGame()">

                Start the little game 💗

            </button>

        </div>

    `;

}


    /* GIFT 3 */

   if (number === "3") {

    icon = "🎁";
    title = "The Special One";

    content = `
        <div class="special-gift-intro">

            <div class="special-gift-sparkles">
                ✦　˚　✧　˚　✦
            </div>

            <div class="special-gift-box">
                🎁
            </div>

            <div class="special-gift-label">
                SOMETHING SPECIAL
            </div>

            <h2 class="special-gift-title">
                You've already opened two...
            </h2>

            <p class="special-gift-text">
                But this one is a little different. 🤍
                <br>
                There's a tiny surprise waiting inside.
            </p>

            <button
                class="special-gift-open-btn"
                onclick="openSpecialGift()">
                Open the surprise ✨
            </button>

        </div>
    `;
}


    giftRevealContent.innerHTML = `

        <div class="reveal-number">
            SURPRISE ${number}
        </div>

        <div class="reveal-icon">
            ${icon}
        </div>

        <h2 class="reveal-title">
            ${title}
        </h2>

        <div class="reveal-text">
            ${content}
        </div>

    `;


    giftModal.classList.add("active");

}


/* =========================
   FIRST MEMORY REVEAL
========================= */

function revealFirstMemory() {

    giftRevealContent.innerHTML = `
        <div class="memory-reveal">

            <div class="memory-date">
                04 · 10
            </div>

            <h2 class="memory-title">
                Where it all began.
            </h2>

            <div class="memory-photo-frame">
                <img
                    src="assets/photos/first-memory.jpg"
                    alt="Our first memory"
                    class="memory-photo"
                >
            </div>

            <p class="memory-caption">
                Jaanu, ye hamari very first conversation hai. 🤍✨
                <br><br>

                Jab bhi main ise dekhta hoon na, mujhe bas ye soch kar
                smile aa jaati hai ki itni si conversation se hamari
                itni beautiful journey start hui thi. 🥹❤️
                <br><br>

                Aur sabse special baat ye hai ki hamari pehli baat
                tumhare birthday wale din hi hui thi. 🎂✨
                Us time humein kya pata tha ki ye chhoti si beginning
                ek din hamare liye itni special ban jayegi. 🫶🏻
                <br><br>

                Aaj humein ek saal ho gaya hai mile hue… ❤️
                Ek saal, jab se hamari ye beautiful si story start hui thi. ✨
                <br><br>

                Kabhi-kabhi peeche mudkar dekhta hoon toh bas ek hi thought aata hai—
                <br><br>

                <strong>
                    “Yahi toh wo moment tha… jahan se sab kuch start hua tha.” 🥹🤍✨
                </strong>
            </p>

            <button
                class="memory-close-btn"
                onclick="closeFirstMemory()"
            >
                Keep this memory ♡
            </button>

        </div>
    `;
}


/* =========================
   CLOSE MEMORY
========================= */

function closeFirstMemory() {

    giftModal.classList.remove("active");

}


/* =========================
   GIFT PROGRESS
========================= */

function updateGiftProgress() {

    const count =
        openedGifts.size;


    giftProgress.textContent =
        `${count} / 3 surprises opened`;


    if (count === 3) {

        setTimeout(() => {

            giftComplete.classList.add("show");

        }, 500);

    }

}


/* =========================
   CLOSE GIFT MODAL
========================= */

if (closeGift) {

    closeGift.addEventListener("click", () => {

        giftModal.classList.remove("active");

    });

}


const giftModalBg =
    document.querySelector(".gift-modal-bg");


if (giftModalBg) {

    giftModalBg.addEventListener("click", () => {

        giftModal.classList.remove("active");

    });

}


/* =========================
   ESCAPE
========================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        giftModal.classList.remove("active");

    }

});
function startGiftTwoGame() {

    giftRevealContent.innerHTML = `

        <div class="little-game">

            <div class="game-level">
                LEVEL 1 · 3
            </div>

            <h2 class="game-title">
                Catch the Heart 💗
            </h2>

            <p class="game-instruction">
                Somewhere in this little garden,
                one special heart is waiting for you...
            </p>

            <div class="heart-game-area" id="heartGameArea">

                <button
                    class="floating-heart heart-one"
                    onclick="heartFound()">
                    💗
                </button>

                <span class="floating-heart heart-two">
                    ♡
                </span>

                <span class="floating-heart heart-three">
                    ♡
                </span>

                <span class="floating-heart heart-four">
                    ✦
                </span>

                <span class="floating-heart heart-five">
                    ♡
                </span>

            </div>

            <p class="game-hint">
                Find the glowing one... ✨
            </p>

        </div>

    `;

}
function heartFound() {

    giftRevealContent.innerHTML = `

        <div class="game-success">

            <div class="success-heart">
                💗
            </div>

            <h2>
                You found it! 🥹
            </h2>

            <p>
                Of course you did, Babuuuuuuu. 🤍✨
            </p>

            <button
                class="game-next-btn"
                onclick="startGiftTwoLevelTwo()">

                Next Level →
                
            </button>

        </div>

    `;

}
function startGiftTwoLevelTwo() {

    giftRevealContent.innerHTML = `

        <div class="little-game">

            <div class="game-level">
                LEVEL 2 · 3
            </div>

            <h2 class="game-title">
                A Little Question 💌
            </h2>

            <p class="game-instruction">
                Out of all these names...
                which one do I call you the most? 🥰
            </p>

            <div class="nickname-options">

                <button
                    class="nickname-option"
                    onclick="wrongNickname(this)">
                    Meri Shona 🥰
                </button>

                <button
                    class="nickname-option"
                    onclick="wrongNickname(this)">
                    Meri Rasmalai 🍬
                </button>

                <button
                    class="nickname-option"
                    onclick="correctNickname()">
                    Meri Pyaari Si Babuuuuuuu ❤️
                </button>

                <button
                    class="nickname-option"
                    onclick="wrongNickname(this)">
                    Meri Princess 👑
                </button>

            </div>

            <p id="nicknameMessage" class="game-hint">
                Choose carefully... 👀
            </p>

        </div>

    `;

}
function wrongNickname(button) {

    const message = document.getElementById("nicknameMessage");

    message.innerHTML =
        "Hehe... nice try 😌💗 Try again!";

    button.style.transform = "scale(0.96)";

    setTimeout(() => {
        button.style.transform = "";
    }, 180);

}


function correctNickname() {

    giftRevealContent.innerHTML = `

        <div class="game-success">

            <div class="success-heart">
                💗
            </div>

            <h2>
                That's My Baby Girl! 🥹❤️
            </h2>

            <p>
                Okayyy... Level 2 complete. ✨
            </p>

            <button
                class="game-next-btn"
                onclick="startGiftTwoLevelThree()">

                Final Level 🔐

            </button>

        </div>

    `;

}
function startGiftTwoLevelThree() {

    giftRevealContent.innerHTML = `

        <div class="little-game">

            <div class="game-level">
                LEVEL 3 · 3
            </div>

            <h2 class="game-title">
                The Final Lock 🔐
            </h2>

            <p class="game-instruction">
                Three little hearts are waiting...
                <br>
                Only one order will unlock the surprise. 💗
            </p>

            <div class="lock-display">

                <div class="lock-icon">
                    🔐
                </div>

                <div class="lock-slots">
                    <span id="slot1">?</span>
                    <span id="slot2">?</span>
                    <span id="slot3">?</span>
                </div>

            </div>

            <p class="game-hint">
                Hint: Start with the heart that shines brightest. ✨
            </p>

            <div class="heart-choices">

                <button
                    class="choice-heart heart-pink"
                    onclick="chooseFinalHeart('pink')">
                    💗
                </button>

                <button
                    class="choice-heart heart-white"
                    onclick="chooseFinalHeart('white')">
                    🤍
                </button>

                <button
                    class="choice-heart heart-purple"
                    onclick="chooseFinalHeart('purple')">
                    💜
                </button>

            </div>

            <p id="finalGameMessage" class="game-hint">
                Choose your first heart...
            </p>

        </div>

    `;

    window.finalHeartSequence = [];
    window.correctHeartSequence = ["pink", "purple", "white"];

}
function chooseFinalHeart(color) {

    if (!window.finalHeartSequence) {
        window.finalHeartSequence = [];
    }

    window.finalHeartSequence.push(color);

    const currentPosition = window.finalHeartSequence.length;

    const slot = document.getElementById(
        "slot" + currentPosition
    );

    if (slot) {

        if (color === "pink") {
            slot.innerHTML = "💗";
        }

        if (color === "purple") {
            slot.innerHTML = "💜";
        }

        if (color === "white") {
            slot.innerHTML = "🤍";
        }

    }

    if (currentPosition === 3) {

        checkFinalHeartSequence();

    } else {

        const message =
            document.getElementById("finalGameMessage");

        if (message) {

            message.innerHTML =
                "Nice... now choose the next one. 👀✨";

        }

    }

}
function checkFinalHeartSequence() {

    const correct =
        JSON.stringify(window.finalHeartSequence) ===
        JSON.stringify(window.correctHeartSequence);

    const message =
        document.getElementById("finalGameMessage");

    if (correct) {

        giftRevealContent.innerHTML = `

            <div class="game-success">

                <div class="success-heart">
                    💗
                </div>

                <h2>
                    You unlocked it! 🔓✨
                </h2>

                <p>
                    I knew My Princess could do it. 🥹❤️
                    <br><br>
                    All three little challenges...
                    and you made it to the end. ✨
                </p>

                <button
                    class="game-next-btn"
                    onclick="giftTwoComplete()">

                    Open Your Surprise 🎁

                </button>

            </div>

        `;

    } else {

        if (message) {

            message.innerHTML =
                "Almost! 💗 That wasn't the right combination. Try again!";

        }

        setTimeout(() => {

            startGiftTwoLevelThree();

        }, 900);

    }

}
function giftTwoComplete() {

    giftRevealContent.innerHTML = `

        <div class="game-success final-gift-two">

            <div class="success-heart">
                🎀
            </div>

            <div class="game-level">
                GIFT 2 UNLOCKED
            </div>

            <h2>
                This one was made just for you. 🤍
            </h2>

            <p>
                apne teeno levels par kar liye merii jaan 🥹✨
            </p>

            <p>
               Aur ab apke liye ek chhoti si chij intezar kar rhi hai 
            </p>

            <div class="final-gift-message">
                ✨ A surprise is coming here ✨
            </div>

        </div>

    `;

}
function giftTwoComplete() {
    giftRevealContent.innerHTML = `
        <div class="game-success final-gift-two">

            <div class="final-gift-video">
                <video
                    src="assets/gifs/dudu2.mp4"
                    autoplay
                    loop
                    muted
                    playsinline>
                </video>
            </div>

            <div class="success-heart">
                🎀
            </div>

            <div class="game-level">
                GIFT 2 UNLOCKED
            </div>

            <h2>
                This one was made just for you. 🤍
            </h2>

            <div class="final-gift-message">

                <p>
                    Anika… ❤️
                </p>

                <p>
                    Meri jaan, meri Shona,
                    meri Pyaari Si Babuuuuuuu,
                    meri Baby Girl… 🥹💗
                </p>

                <p>
                    Ye chhota sa game shayad dekhne mein
                    bas ek cute sa surprise lage,
                    lekin iske peeche meri kaafi saari
                    mehnat, time aur sabse zyada...
                    tum ho. ✨
                </p>

                <p>
                    Isse banate waqt baar-baar bas ye soch raha tha
                    ki jab tum ise open karogi,
                    toh tumhare face par ek chhoti si smile aa jaye. 🥹🤍
                </p>

                <p>
                    Tumhare saath bitaya hua time mere liye
                    normal time nahi hai, Anika.
                    Mere liye woh moments bahut zyada special hain. ❤️
                </p>

                <p>
                    Chhoti-chhoti baatein,
                    random conversations,
                    hasi-mazaak...
                    pata nahi kab ye sab mere liye
                    itna important ban gaya. 🥹💗
                </p>

                <p>
                    Meri Rasmalai, meri Princess… 👑💗
                </p>

                <p>
                    Bas itna chahta hoon ki tum hamesha
                    aise hi mere saath khush raho,
                    hasti raho aur hum dono ke ye cute se
                    moments aise hi chalte rahein. 🥹❤️
                </p>

                <p>
                    Aur haan...
                    main tumhe hamesha bahut zyada
                    pyaar karta rahunga,
                    meri Pyaari Si Babuuuuuuu. 🫶🏻💗✨
                </p>

                <p class="final-birthday-line">
                    Happy Birthday, meri pyaari si Babuuuuuuu. 🎂❤️
                </p>

                <p>
                    You are truly very special to me. 🥹💗
                </p>

            </div>

        </div>
    `;
}
function openSpecialGift() {

    giftRevealContent.innerHTML = `
        <div class="special-gift-opening">

            <div class="opening-sparkles">
                ✦ ✧ ✦ ✧ ✦
            </div>

            <div
                class="animated-gift-box"
                id="animatedGiftBox"
                onclick="openGiftBox()"
            >
                <div class="gift-lid">
                    🎀
                </div>

                <div class="gift-body">
                    🎁
                </div>
            </div>

            <h2>
                Wait... 👀✨
            </h2>

            <p>
                Something special is waiting inside...
            </p>

            <button
                class="touch-gift-btn"
                onclick="openGiftBox()">
                Open the gift 🎁
            </button>

        </div>
    `;
}
function openGiftBox() {

    const box = document.getElementById("animatedGiftBox");

    if (box) {
        box.classList.add("gift-box-opening");
    }

    setTimeout(() => {

        giftRevealContent.innerHTML = `
            <div class="gift-inside-reveal">

                <div class="inside-sparkles">
                    ✦ ✧ ✦ ✧ ✦
                </div>

                <div class="revealed-heart">
                    💗
                </div>

                <div class="revealed-ribbon">
                    🎀
                </div>

                <h2>
                    You found it... 🥹✨
                </h2>

                <p>
                    But this isn't the surprise yet. 👀
                </p>

                <button
                    class="continue-special-btn"
                    onclick="continueSpecialGift()">
                    What's inside? ✨
                </button>

            </div>
        `;

    }, 1200);
}
function continueSpecialGift() {

    giftRevealContent.innerHTML = `
        <div class="special-mystery">

            <div class="mystery-icon">
                ✨
            </div>

            <div class="game-level">
                ONE LITTLE SECRET
            </div>

            <h2>
                Hmm... 👀
            </h2>

            <p>
                There's something hidden here...
                <br>
                but you'll have to find it. 🤍
            </p>

            <button
                class="mystery-continue-btn"
                onclick="revealSpecialSurprise()">
                Find the surprise 🔍✨
            </button>

        </div>
    `;
}
function revealSpecialSurprise() {

    giftRevealContent.innerHTML = `
        <div class="hidden-surprise">

            <div class="hidden-sparkles">
                ✦　✧　✦　✧　✦
            </div>

            <div class="game-level">
                ONE LITTLE SECRET
            </div>

            <h2 class="hidden-title">
                Okay Babuuuuuuu... 👀💗
            </h2>

            <p class="hidden-text">
                Ab dhyaan se dekho...
                <br>
                in teenon mein se ek ke andar
                tumhare liye something special hidden hai. ✨
            </p>

            <div class="hidden-choices">

                <button
                    class="hidden-choice"
                    onclick="wrongSpecialChoice(this)">
                    💗
                </button>

                <button
                    class="hidden-choice"
                    onclick="correctSpecialChoice()">
                    🎀
                </button>

                <button
                    class="hidden-choice"
                    onclick="wrongSpecialChoice(this)">
                    ✨
                </button>

            </div>

            <p
                id="hiddenChoiceMessage"
                class="hidden-hint">
                Choose one... 👀
            </p>

        </div>
    `;
}
function wrongSpecialChoice(button) {

    const message =
        document.getElementById("hiddenChoiceMessage");

    if (message) {
        message.innerHTML =
            "Hehe... not this one, Babuuuuuuu 😭💗 Try again!";
    }

    button.classList.add("choice-wrong");

    setTimeout(() => {
        button.classList.remove("choice-wrong");
    }, 500);
}
function correctSpecialChoice() {

    giftRevealContent.innerHTML = `
        <div class="special-reveal">

            <div class="reveal-sparkles">
                ✦ ✧ ✦ ✧ ✦
            </div>

            <div class="reveal-heart">
                💗
            </div>

            <div class="game-level">
                YOU FOUND IT
            </div>

            <h2>
                I knew you'd find it. 🥹❤️
            </h2>

            <p>
                But wait...
                this little surprise has one more thing
                to show you. 👀✨
            </p>

            <button
                class="final-special-btn"
                onclick="openFinalGiftThree()">
                Show me ✨
            </button>

        </div>
    `;
}
function openFinalGiftThree() {

    giftRevealContent.innerHTML = `
        <div class="final-gift-three">

            <div class="final-stars">
                ✦ ✧ ✦ ✧ ✦
            </div>

            <div class="final-gift-icon">
                🎀
            </div>

            <div class="game-level">
                A LITTLE SURPRISE
            </div>

            <h2 class="final-gift-title">
                Sirf tumhare liye, Anika. 🤍
            </h2>

            <p class="final-gift-text">
                Meri Shona, ye little surprise
                maine specially tumhare liye banayi hai. ✨
                Bas ek chhoti si smile ke liye,
                because you are very special to me. 💗
            </p>

            <div class="final-surprise-card">

                <div class="surprise-card-icon">
                    ✨
                </div>

                <h3>
                    Tum ordinary moments ko bhi
                    thoda more special bana deti ho.
                </h3>

                <p>
                    So here's a little reminder
                    ki tum mere liye kitni special ho. 🥹💗
                </p>

            </div>

            <button
                class="finish-gift-three-btn"
                onclick="finishGiftThree()">
                Keep this little surprise ♡
            </button>

        </div>
    `;
}


function finishGiftThree() {

    giftRevealContent.innerHTML = `
        <div class="gift-three-finished">

            <div class="finished-icon">
                🌷
            </div>

            <h2>
                Gift 3 is yours. 🤍
            </h2>

            <p>
                Meri Princess, I hope ye little surprise
                dekh kar tumhare face par ek cute si smile aayi hogi. ✨
            </p>

            <p>
                Aur haan...
                birthday story abhi khatam nahi hui hai. 👀💗
            </p>

            <p>
                There's still something special
                waiting for you ahead. 🥹✨
            </p>

            <div class="finished-sparkles">
                ✦ ✧ ✦
            </div>

        </div>
    `;
}
/* =========================
   LETTER
========================= */

function openLetter() {

    giftRevealContent.innerHTML = `

        <div class="letter-experience">

            <div class="letter-floating-heart heart-a">♡</div>
            <div class="letter-floating-heart heart-b">♡</div>
            <div class="letter-floating-heart heart-c">♥</div>
            <div class="letter-floating-heart heart-d">♡</div>

            <div class="letter-sparkles">
                ✦　✧　♡　✧　✦
            </div>

            <div class="letter-top-line">
                <span></span>
                <b>♥</b>
                <span></span>
            </div>

            <div class="letter-icon">
                💌
            </div>

            <div class="letter-label">
                A LITTLE LETTER
            </div>

            <h2 class="letter-title">
                Just For You,
            </h2>

            <div class="letter-name">
                Anika ♡
            </div>

            <div class="letter-divider">
                <span>✦</span>
                <span>♡</span>
                <span>✦</span>
            </div>

            <p class="letter-intro">
                Kuch feelings aisi hoti hain...
                <br>
                jo bolne se zyada,
                likhne par beautiful lagti hain. 🥹💗
            </p>

            <p class="letter-intro-small">
                So... maine tumhare liye kuch likha hai. 🤍
            </p>

            <div class="letter-envelope">

                <div class="envelope-glow"></div>

                <div class="envelope-heart">
                    ♥
                </div>

            </div>

            <button
                class="open-letter-btn"
                onclick="showMyLetter()">

                <span>✧</span>
                Open My Letter 💌
                <span>✧</span>

            </button>

            <div class="letter-bottom-line">
                <span>♡</span>
                <span>Made with love</span>
                <span>♡</span>
            </div>

        </div>

    `;

    giftModal.classList.add("active");
}
/* =========================
   SHOW THE LETTER
========================= */

function showMyLetter() {

    giftRevealContent.innerHTML = `

        <div class="full-letter">

            <div class="letter-paper-decor top-left">
                ❀
            </div>

            <div class="letter-paper-decor top-right">
                ❀
            </div>

            <div class="letter-paper">

                <div class="paper-top">
                    <span>✦</span>
                    <span>♡</span>
                    <span>✦</span>
                </div>

                <div class="paper-label">
                    A LETTER FROM MY HEART
                </div>

                <h2 class="paper-title">
                    Happy Birthday,
                </h2>

                <div class="paper-name">
                    Meri Babuuu ❤️
                </div>

                <div class="paper-divider">
                    ─── ♡ ───
                </div>

                <div class="letter-body">

                    <p>
                        Meri pyaari si jaan, meri shona, meri princess… 🥹🫂❤️
                    </p>

                    <p>
                        Aaj ka din mere liye sirf tumhara birthday nahi hai,
                        balki woh din hai jab main us insaan ko celebrate kar raha hoon
                        jo meri life mein aakar meri duniya ka ek bohot hi khoobsurat
                        hissa ban gayi. ❤️
                    </p>

                    <p>
                        Kabhi-kabhi main sochta hoon ki humari story kitni ajeeb si
                        shuru hui thi… ek normal si baat-cheet se shuru hua sab kuch
                        aur pata hi nahi chala kab tum meri itni important person ban gayi.
                        Dheere-dheere tum meri aadat bani, meri smile ka reason bani,
                        meri favourite notification bani aur phir meri life ki woh person
                        ban gayi jiske saath main apni har chhoti-badi feeling share karna
                        chahta hoon. 🥹❤️
                    </p>

                    <p>
                        Mujhe tumhari sirf khoobsurat baatein hi pasand nahi hain.
                        Mujhe tumhari woh chhoti-chhoti habits bhi pasand hain jo shayad
                        tum khud kabhi notice nahi karti. Tumhara mera dhyan rakhna,
                        jab main careless hota hoon toh mujhe daantna, meri stupid baaton
                        ko tolerate karna, meri fikr karna aur kabhi-kabhi bina kuch kahe
                        bhi mujhe samajh jaana… ye sab mere liye bohot special hai. 🫂🥹
                    </p>

                    <p>
                        Aur sabse zyada mujhe tumhara dil pasand hai—woh soft sa dil
                        jo shayad duniya ke saamne har waqt nahi dikhta, lekin mujhe
                        tumhari baaton mein baar-baar nazar aata hai. ❤️
                    </p>

                    <div class="letter-heart-break">
                        ♡ ✦ ♡
                    </div>

                    <p>
                        Humare beech distance hai, alag cities hain, kabhi time nahi milta,
                        kabhi situations difficult ho jaati hain… lekin in sab ke bawajood
                        tum mere liye special ho. Aur main chahta hoon ki chahe life hume
                        kitni bhi situations dikhaye, main tumhare saath khada rahun. 🫂
                    </p>

                    <p class="promise-line">
                        Mera tumse ek promise hai…
                    </p>

                    <p>
                        Main hamesha tumhara saath dene ki poori koshish karunga.
                        Achhe waqt mein bhi aur mushkil waqt mein bhi. Jab tum khush hogi
                        toh tumhari happiness mein genuinely khush hounga, aur jab tum
                        pareshaan hogi toh tumhe akela feel nahi hone dunga.
                    </p>

                    <p>
                        Life mein kuch bhi ho, situations chahe kitni bhi difficult kyun
                        na ho jaayein, main tumhara haath chhodne wala insaan nahi banna
                        chahta. Main har cheez ko baat karke, samajhkar aur ek-doosre ki
                        respect ke saath handle karna chahta hoon. ❤️🫂
                    </p>

                    <p>
                        Aur jab hum future ke baare mein sochte hain na—saath trips,
                        naye places explore karna, Shimla ki thandi hawa mein ghoomna,
                        random photos click karna, ek-doosre ko tang karna aur phir
                        unhi moments ko yaad karke hasna… 🥹✨
                    </p>

                    <p>
                        Mujhe nahi pata future exactly kaisa hoga, lekin itna zaroor pata
                        hai ki main apne future ke khoobsurat moments mein tumhe imagine
                        karta hoon. ❤️
                    </p>

                    <p>
                        Tumne meri life mein jo memories di hain, unke liye main tumhara
                        hamesha thankful rahunga. Aur main chahta hoon ki aaj se tumhari
                        life ka har naya saal pichhle saal se bhi zyada beautiful ho.
                    </p>

                    <div class="letter-wishes">

                        <p>Tum hamesha khush raho.</p>
                        <p>Tumhari smile kabhi kam na ho.</p>
                        <p>Tumhare saare dreams poore hon.</p>

                    </div>

                    <p>
                        Aur jab bhi life thodi difficult lage, tumhe yaad rahe ki kahin
                        na kahin ek pagal sa insaan hai jo tumhari happiness ko genuinely
                        important maanta hai. 🥹🫂❤️
                    </p>

                    <p class="birthday-line">
                        Happy Birthday, Meri Babuuu. 🎂❤️
                    </p>

                    <p>
                        Thank you meri life ka itna beautiful part banne ke liye.
                        <br>
                        Thank you mujhe itna pyaar, care aur memories dene ke liye.
                        <br>
                        Aur thank you… bas tum hone ke liye. 🥹❤️
                    </p>

                    <p>
                        Main tumhe aaj bhi bohot pyaar karta hoon, kal bhi karunga,
                        aur zindagi ke har mod par tumhare liye wahi pyaar aur care
                        dil mein rakhna chahta hoon. ❤️
                    </p>

                    <p class="final-birthday">
                        Happy Birthday once again, meri jaan,
                        meri princess, meri pyari si babuuu Anika. 🥹🫂❤️🎂✨
                    </p>

                </div>

                <div class="paper-bottom">

                    <div class="signature">
                        — Tumhara Arman 💋
                    </div>

                    <div class="bottom-hearts">
                        ♡　♥　♡
                    </div>

                </div>

            </div>

        </div>

    `;
}
/* =========================
   A LITTLE GAME — QUIZ
========================= */

let littleGameQuestion = 0;
let littleGameScore = 0;

const littleGameQuestions = [

    {
        question: "Mera favourite food kya hai? 🍗",
        options: [
            "Pizza 🍕",
            "Biryani 🍗",
            "Momos 🥟",
            "Burger 🍔"
        ],
        correct: 1
    },

    {
        question: "Mere favourite games kaunse hain? 🎮",
        options: [
            "Minecraft + Roblox",
            "PUBG + Valorant",
            "Free Fire + GTA 5",
            "FIFA + Minecraft"
        ],
        correct: 2
    },

    {
        question: "Mera favourite colour kya hai? 🖤",
        options: [
            "Blue 💙",
            "White 🤍",
            "Black 🖤",
            "Red ❤️"
        ],
        correct: 2
    },

    {
        question: "Main tumhare saath sabse zyada kya karta hoon? 🥹",
        options: [
            "Tumhe shopping karwata hoon 🛍️",
            "Tumhari care karta hoon ❤️",
            "Tumhe har baat par chidhata hoon 😭",
            "Tumhare saath movies dekhta hoon 🎬"
        ],
        correct: 1
    },

    {
        question: "Humne future mein kaunsi trip plan ki hai? 🏔️",
        options: [
            "Manali 🏔️",
            "Goa 🌊",
            "Shimla ❄️",
            "Jaipur 🕌"
        ],
        correct: 2
    },

    {
        question: "Tum mujhe inmein se kin naamon se bulati ho? 💗",
        options: [
            "Mera pyaara sa bachcha 🥹",
            "Meri nanni si jaan 🤍",
            "Jaanu ❤️",
            "Ye teeno ✨"
        ],
        correct: 3
    }

];


/* =========================
   OPEN LITTLE GAME
========================= */

function openLittleGame() {

    littleGameQuestion = 0;
    littleGameScore = 0;

    giftRevealContent.innerHTML = `

        <div class="quiz-welcome">

            <div class="quiz-floating-heart heart-one">💗</div>
            <div class="quiz-floating-heart heart-two">♡</div>
            <div class="quiz-floating-heart heart-three">💗</div>
            <div class="quiz-floating-heart heart-four">♡</div>

            <div class="quiz-top-sparkles">
                ✦　✧　♡　✧　✦
            </div>

            <div class="quiz-small-label">
                ~ A LITTLE GAME ~
            </div>

            <div class="quiz-big-heart">
                💗
            </div>

            <h2 class="quiz-welcome-title">
                Heyyy Anikaaa... 💗
            </h2>

            <p class="quiz-welcome-text">
                Gifts wale game mein tumne
                <br>
                kaafi dimaag laga liya 👀
                <br><br>
                Ab dekhte hain...
                <br>
                tum mujhe kitna jaanti ho. 🥹💗
            </p>

            <div class="quiz-mini-hearts">
                ♡　♥　♡
            </div>

            <button
                class="quiz-start-btn"
                onclick="beginLittleGameQuiz()">

                Let's Start ♡

            </button>

            <p class="quiz-bottom-text">
                made with little hearts & lots of love ✨
            </p>

        </div>

    `;

    giftModal.classList.add("active");
    giftModal.classList.add("quiz-active");

}


/* =========================
   START / SHOW QUESTION
========================= */

function startLittleGame() {

    const current =
        littleGameQuestions[littleGameQuestion];

    giftRevealContent.innerHTML = `

        <div class="little-quiz">

            <div class="quiz-top-row">

                <button
                    class="quiz-back-btn"
                    onclick="closeLittleGame()">
                    ‹
                </button>

                <div class="quiz-heart-progress">

                    ${Array.from(
                        { length: littleGameQuestions.length },
                        (_, i) =>
                            `<span class="${i <= littleGameQuestion ? "filled" : ""}">
                                ♥
                            </span>`
                    ).join("")}

                </div>

            </div>


            <div class="quiz-question-badge">
                Question ${littleGameQuestion + 1}
                / ${littleGameQuestions.length}
            </div>


            <div class="quiz-question-card">

                <div class="quiz-question-heart">
                    💗
                </div>

                <h2 class="quiz-title">
                    ${current.question}
                </h2>


                <div class="quiz-options">

                    ${current.options.map((option, index) => `

                        <button
                            class="quiz-option"
                            onclick="answerLittleGame(${index})">

                            <span class="quiz-option-letter">
                                ${String.fromCharCode(65 + index)}
                            </span>

                            <span class="quiz-option-text">
                                ${option}
                            </span>

                            <span class="quiz-option-check">
                                ✓
                            </span>

                        </button>

                    `).join("")}

                </div>


                <p id="quizMessage" class="quiz-message">
                    Choose carefully... 👀💗
                </p>

            </div>


            <div class="quiz-bottom-decoration">
                ✦　♥　♡　♥　✦
            </div>

        </div>

    `;

}


/* =========================
   ANSWER QUESTION
========================= */

function answerLittleGame(selected) {

    const current =
        littleGameQuestions[littleGameQuestion];

    const buttons =
        document.querySelectorAll(".quiz-option");

    const message =
        document.getElementById("quizMessage");


    buttons.forEach(button => {
        button.disabled = true;
    });


    if (selected === current.correct) {

        littleGameScore++;

        if (buttons[selected]) {
            buttons[selected].classList.add("quiz-correct");
        }

        message.innerHTML =
            "Yesss! You got it right. 🥹💗";

        setTimeout(() => {

            littleGameQuestion++;

            if (
                littleGameQuestion <
                littleGameQuestions.length
            ) {

                startLittleGame();

            } else {

                finishLittleGame();

            }

        }, 900);


    } else {

        if (buttons[selected]) {
            buttons[selected].classList.add("quiz-wrong");
        }

        message.innerHTML =
            "Hehe... not this one 😭💗 Try again!";

        setTimeout(() => {

            buttons.forEach(button => {
                button.disabled = false;
                button.classList.remove("quiz-wrong");
            });

            message.innerHTML =
                "Okayyy... one more try 👀✨";

        }, 700);

    }

}


/* =========================
   QUIZ FINISH
========================= */

function finishLittleGame() {

    giftRevealContent.innerHTML = `

        <div class="quiz-finished">

            <div class="quiz-finish-icon">
                💗
            </div>

            <div class="game-level">
                GAME COMPLETE ✨
            </div>

            <h2>
                You really know me. 🥹❤️
            </h2>

            <div class="quiz-score">
                ${littleGameScore} / ${littleGameQuestions.length}
            </div>

            <p>
                Lagta hai tumhe mere baare mein
                kaafi kuch yaad hai. 🥹💗
            </p>

            <p>
                Aur honestly...
                mere liye ye little game se bhi zyada
                special hai ki tum meri little world ka
                itna important part ho. 🤍
            </p>

            <div class="quiz-final-hearts">
                ✦ ♡ ✦ ♡ ✦
            </div>

            <button
                class="quiz-close-btn"
                onclick="closeLittleGame()">

                Keep this little memory ♡

            </button>

        </div>

    `;

}


/* =========================
   CLOSE LITTLE GAME
========================= */

function closeLittleGame() {

    giftModal.classList.remove("active");
    giftModal.classList.remove("quiz-active");

}
function beginLittleGameQuiz() {

    littleGameQuestion = 0;
    littleGameScore = 0;

    startLittleGame();

}

/* =========================
   OPEN MEMORIES ROOM
========================= */

function openMemoriesRoom() {

    world.classList.remove("active");

    setTimeout(() => {

        memoriesRoom.classList.add("active");

    }, 450);

}


/* =========================
   BACK FROM MEMORIES
========================= */

if (backFromMemories) {

    backFromMemories.addEventListener("click", () => {

        memoriesRoom.classList.remove("active");

        setTimeout(() => {

            world.classList.add("active");

        }, 450);

    });

}