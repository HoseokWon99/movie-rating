function renderCredits(props) {
    const { credits } = props;

    const render = (credit) => {
        return `
            <div  
                id="credit-${credit.id}" 
                class="card border-0 shadow-sm text-center" 
                style="min-width: 160px;"
            >
                <img 
                    src="https://image.tmdb.org/t/p/w185/${credit.profilePath}" 
                    class="card-img-top rounded-top" 
                    alt="profile-img"
                >
                <div class="card-body p-2">
                    <h6 class="card-title mb-1">${credit.name}</h6>
                    <p class="text-muted mb-0" style="font-size: 0.9rem;">${credit.role}</p>
                </div>
            </div>
        `;
    };

    return (`
            <div class="d-flex overflow-auto gap-3 pb-2">
                ${credits.map(credit => render(credit))}
            </div>
    `);
}
