function renderSuccess() {
  return (`
          <div class="text-success status-icon mb-3">✅</div>
          <h4>이메일 인증이 성공적으로 완료되었습니다!</h4>
          <a href="/users/sign-in" class="btn btn-primary mt-3">로그인 하러 가기</a>
  `);
}

function renderFailure() {
  return (`
          <div class="text-danger status-icon mb-3">❌</div>
          <h4>이메일 인증에 실패하였습니다!</h4>
          <p>유효하지 않거나 만료된 링크 입니다.</p>
          <a href="/users/sign-up" class="btn btn-outline-danger mt-3">다시 회원가입 하기</a>
  `);
}