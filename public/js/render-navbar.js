const getAccessToken = () => {
  return localStorage.getItem("TOKEN");
}

const setAccessToken = (accessToken) => {
  localStorage.setItem("TOKEN", accessToken);
}

async function handleSignOut() {
  const accessToken = getAccessToken();

  if (accessToken) {
    await fetch("api/auth/sign-out", {
      method: "GET",
      headers: { "Authorization": `Bearer ${accessToken}` }
    });
  }

  location.reload();
}

async function renderAuth(accessToken) {


    if (accessToken) {

        return  (
                `
                  <div class="dropdown">
                    <button class="btn p-0 border-0 bg-transparent dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src="/img/default_profile_image.png" alt="profile" class="rounded-circle" width="32" height="32">
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li><a class="dropdown-item" href="/profiles">마이페이지</a></li>
                      <li><hr class="dropdown-divider"></li>
                      <li>
                        <span 
                            class="dropdown-item" 
                            onclick="handleSignOut()"
                        >
                            로그아웃
                        </span>
                      </li>
                    </ul>
                  </div>
            `
        );
    }
    else {
      return  (`
            <div class="d-flex gap-2">
                <a href="/users/sign-in" class="btn btn-outline-light btn-sm">로그인</a>
                <a href="/users/sign-up" class="btn btn-primary btn-sm">회원가입</a>
            </div>
      `);
    }
}


async function renderNavbar(accessToken) {


    return (`
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <a class="navbar-brand" href="#">🎬 Cine Agora</a>
            
                    <!-- Toggle for mobile -->
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                        <span class="navbar-toggler-icon"></span>
                    </button>
            
                    <!-- Navbar content -->
                    <div class="collapse navbar-collapse" id="navbarContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <!-- You can add nav links here -->
                        </ul>
            
                        <!-- Search bar -->
                        <form class="d-flex me-3" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search movies..." aria-label="Search">
                            <button class="btn btn-outline-light" type="submit">Search</button>
                        </form>
                        ${await renderAuth(accessToken)}
                    </div>
                </div>
            </nav>
    `)
}