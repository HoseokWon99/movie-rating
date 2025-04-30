function renderEditProfile(props) {
  const { nickname, imageURL } = props;

  return (`
         <div class="container mt-5">
            <div class="text-center mb-4">
              <img
                      id="image-preview"
                      src="${imageURL}"
                      alt="Profile Preview" class="rounded-circle mx-auto d-block"
                      width="100" height="100"
              >
              <div class="mt-2">
                <button
                        type="button"
                        class="btn btn-outline-secondary btn-sm"
                        onclick="document.getElementById('profile-image-input').click()"
                >Choose Image</button>
              </div>
              <input type="file" id="profile-image-input" class="d-none">
            </div>
            <form id="edit-profile-form">
              <div class="mb-3">
                <label for="nickname-input" class="form-label">닉네임</label>
                <div class="input-group">
                  <input
                          type="text"
                          class="form-control"
                          id="nickname-input"
                          value="${nickname}"
                          required
                  >
                  <button
                          type="button"
                          class="btn btn-outline-secondary"
                          id="check-nickname-btn"
                  >중복체크</button>
                </div>
              </div>
            </form>
          </div>
  `)
}

function setEditProfileCallback(props) {
  const imagePreview = document.getElementById("image-preview");
  const profileImageInput = document.getElementById("profile-image-input");
  const nicknameInput = document.getElementById("nickname-input");
  const checkNicknameBtn = document.getElementById("check-nickname-btn");
}