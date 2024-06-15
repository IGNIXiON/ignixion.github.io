$(document).ready(function() {
    fetchWorks();
});

function fetchWorks() {
    $.ajax({
        url: `../data/works.json`,
        method: `GET`,
        dataType: `json`
    })
    .then(
        data => handleWorksSuccess(data),
        error => handleWorksError()
    );
}

function handleWorksSuccess(data) {
    data.forEach(item => {

        if (item.status == `available`) {
            var listItem = generateAvailableItem(item);
        } else if (item.status == `restricted`) {
            var listItem = generateRestrictedItem(item);
        } else if (item.status == `unavailable`) {
            var listItem = generateUnavailableItem(item);
        }
        
        $(`#${item.year}`)?.append(listItem);
        $(`#${item.category}`)?.append(listItem);
        
    });
}

function handleWorksError(jqXHR, textStatus, errorThrown) {
    console.error(`Error loading data: ${textStatus}`);
}

function generateAvailableItem(item) {
    const YTurl = generateYouTubeUrl(item.youtubeID, item.status);
    
    return `
    <li>
        <a id="${item.youtubeID}.btn.open" class="btn open" type="button" data-dialog-id="${item.youtubeID}" data-content-type="dynamic" style="border-style: none;">
            <div class="work-card">
                <div class="video-status ${item.status}"></div>
                <div class="work-details">
                    <p class="detail1">${item.detail[0]}</p>
                    <p class="detail2">${item.detail[1]}</p>
                </div>
            </div>
        </a>
        <dialog id="${item.youtubeID}" class="dialog">
            <div class="dialog-inner">
                <iframe id="${item.youtubeID}.YTplayer" src="${YTurl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                <a id="${item.youtubeID}.btn.close" class="btn close" type="button" data-dialog-id="${item.youtubeID}" data-content-type="dynamic" style="border-style: none;">
                    <div class="crossbutton"></div>
                </a>
            </div>
        </dialog>
    </li>`;
}

function generateRestrictedItem(item) {
    const YTurl = generateYouTubeUrl(item.youtubeID, item.status);

    return`
    <li>
        <a href="${YTurl}" target="_blank">
            <div class="work-card">
                <div class="video-status ${item.status}"></div>
                <div class="work-details">
                    <p class="detail1">${item.detail[0]}</p>
                    <p class="detail2">${item.detail[1]}</p>
                </div>
            </div>
        </a>
    </li>`;
}

function generateUnavailableItem(item) {

    return `
    <li>
        <div class="work-card">
            <div class="video-status ${item.status}"></div>
            <div class="work-details">
                <p class="detail1">${item.detail[0]}</p>
                <p class="detail2">${item.detail[1]}</p>
            </div>
        </div>
    </li>`;
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
