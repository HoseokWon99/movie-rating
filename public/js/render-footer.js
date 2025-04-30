function renderFooter(props) {
    const { likes, comments } = props;

    return (`
            <div class="border-top pt-3 mt-3 text-muted" style="padding: 10px;">
                <i class="fa-regular fa-thumbs-up me-1"></i>
                <span>${likes}</span>
                <i class="fa-regular fa-comment ms-3 me-1"></i>
                <span>${comments.length}</span>
            </div>              
    `);
}