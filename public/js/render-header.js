function renderHeader(props) {

    const { userId, nickname, imageURL  } = props.profile;
    const { rating } = props;

    return (`
              <div class="d-flex border-bottom justify-content-between align-items-center mb-3">
                  <div id="profile-${userId}" class="d-flex align-items-center gap-2">
                    <img src="${imageURL}" class="rounded-circle" alt="User" width="40" height="40">
                    <div class="fw-semibold">${nickname}</div>
                  </div>
                  <div class="bg-white border rounded-pill px-3 py-1 d-flex align-items-center">
                    <i class="fa-solid fa-star text-secondary me-1"></i>
                    <span>${rating}/5</span>
                  </div>
              </div>
    `);
}