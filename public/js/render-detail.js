function renderDetail(props) {

    const {
        title,
        releaseAt,
        genres,
        runtime,
        reputation,
        overview
    } = props;

    return (`
           <div class="row g-4">
                <div class="col-md-4">
                    <img 
                        class="img-fluid rounded"
                        src=${`https://image.tmdb.org/t/p/w400/${props.posterPath}`}
                        alt="poster" 
                    >
                </div>
                <div class="col-md-8">
                    <h2 class="mb-3">${title}</h2>
                    <p><strong>개봉일: </strong>${releaseAt}</p>
                    <p><strong>장르: </strong> ${genres.map(g => g + ' ')}</p>
                    <p><strong>러닝타임: </strong>${runtime}분</p>
                    <p><strong>평점: </strong> ⭐${reputation}/5</p>
                    <hr>
                    <p><strong>줄거리</strong><br>
                        ${overview}
                    </p>
                </div>
             </div>
        `);
}