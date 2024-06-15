$(document).ready(function() {
    fetchTipPicks();
    setupSwiper();
});

function fetchTipPicks() {
    $.ajax({
        url: `../data/works.json`,
        method: `GET`,
        dataType: `json`
    })
    .then(
        data => handleTopPicksSuccess(data),
        error => handleTopPicksError()
    );
}

function handleTopPicksSuccess(data) {
    const topPicks = $(`#top-picks`);
    data.filter(item => item.pickup).forEach(item => {
        topPicks.append(generateSwiperVideoCard(item));
    });
}

function handleTopPicksError(jqXHR, textStatus, errorThrown) {
    console.error(`Error loading data: ${textStatus}`);
}

function generateSwiperVideoCard(item) {
    const YTurl = generateYouTubeUrl(item.youtubeID, item.status);
    const thumbnailUrl = generateYouTubeUrl(item.youtubeID, `thumbnail`);
    
    return `
    <div class="swiper-slide">
        <div class="video-card">
            <div class="thumbnail">
                <a id="${item.youtubeID}.btn.open" class="btn open" type="button" data-dialog-id="${item.youtubeID}" data-content-type="dynamic" style="border-style: none;">
                    <img src="${thumbnailUrl}">
                    <div class="playicon">
                        <img src="./media/play_thumbnail.svg" width="40px" height="40px">
                    </div>
                </a>
                <div class="cornermark lt">+</div>
                <div class="cornermark rt">+</div>
                <div class="cornermark lb">+</div>
                <div class="cornermark rb">+</div> 
                <dialog id="${item.youtubeID}" class="dialog">
                    <div class="dialog-inner">
                        <iframe id="${item.youtubeID}.YTplayer" src="${YTurl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                        <a id="${item.youtubeID}.btn.close" class="btn close" type="button" data-dialog-id="${item.youtubeID}" data-content-type="dynamic" style="border-style: none;">
                            <div class="crossbutton"></div>
                        </a>
                    </div>
                </dialog>
            </div>
            <p>${item.caption}</p>
        </div>
    </div>`;
}

function generateYouTubeUrl(youtubeID, urltype){
    if (urltype == `available`){
        return `https://www.youtube.com/embed/${youtubeID}?enablejsapi=1`;
    } else if (urltype == `restricted`){
        return `https://www.youtube.com/watch?v=${youtubeID}`;
    } else if (urltype == `thumbnail`){
        return `https://img.youtube.com/vi/${youtubeID}/mqdefault.jpg`;
    }
}

// swiper
function setupSwiper() {
    var swiper = new Swiper(`.swiper-container`, {
        slidesPerView: 1,
        spaceBetween: 30,
        grabCursor: true,
        pagination: {
            el: `.swiper-pagination`,
            clickable: true,
        },
        navigation: {
            nextEl: `.swiper-button-next`,
            prevEl: `.swiper-button-prev`,
        },
        breakpoints: {
            1080: {
                slidesPerView: 3,
                centeredSlides: false,
            }
        },
    });
}
