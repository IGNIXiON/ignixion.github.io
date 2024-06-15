$(document).ready(function() {
    setupStaticModals();
    setupReturnToTop();
});

// Event listeners set-up when DOM is loaded.
function setupStaticModals() {
    document.querySelectorAll(`.dialog`).forEach(modal => {
        var YTplayer = setupYouTubePlayer(`${modal.id}.YTplayer`);
        setupModal(modal, YTplayer);
    });
}

function setupModal(modal, YTplayer){

    // clicking an open button open the modal window.
    const openButton = document.getElementById(`${modal.id}.btn.open`);
    openButton?.addEventListener(`click`, () => {
        document.body.classList.add(`is-modal`);
        modal.showModal();
    });
    
    // clicking an colse button close the modal window.
    const closeButton = document.getElementById(`${modal.id}.btn.close`);
    closeButton?.addEventListener(`click`, () => {
        document.body.classList.remove(`is-modal`);
        modal.close();
        // if this modal contain a youtube player, closing modal stop it.
        YTplayer.stopVideo();
    });

    // clicking the outside of a modal window close it.
    modal.addEventListener(`cancel`, () => {
        document.body.classList.remove(`is-modal`);
    });
    modal.addEventListener(`click`, e => {
        if (!e.target.closest(`.dialog-inner`)) {
            document.body.classList.remove(`is-modal`);
            modal.close();
            // if this modal contain a youtube player, closing modal stop it.
            YTplayer.stopVideo();
        }
    });
}

// Setup a youtube player tagged with YTplayerID
function setupYouTubePlayer(YTplayerID){
    if (window.YT && YT.Player) {
        return new YT.Player(YTplayerID);
    } else {
        console.log(`YouTube API does not exsit.`);
        return null;
    }
}

// Event listeners set-up when a open button is clicked
$(document).on(`click`, `.open`, function () {
    if ($(this).data(`content-type`) == `dynamic`){
        const clickedButton = $(this);
        setupDynamicModal(clickedButton);
    }
});

function setupDynamicModal(clickedButton){
    const dialogID = clickedButton.data(`dialog-id`);
    const modal = document.getElementById(dialogID);
    const YTplayer = setupYouTubePlayer(`${modal.id}.YTplayer`);

    document.body.classList.add(`is-modal`);
    modal.showModal();

    setupModal(modal, YTplayer);
}

// set up the return-to-top button
function setupReturnToTop() {
    window.onscroll = function() {
        document.getElementById(`return-to-top`).style.display 
        = window.scrollY > 300 ? `block` : `none`;
    };
    document.getElementById(`return-to-top`)
            .addEventListener(`click`, scrollToTop);
}

function scrollToTop(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: `smooth` });
}