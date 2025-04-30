function renderReviewBody(props) {
    const { content } = props;

    return (` 
                <div class="container mb-4 bg-light rounded">
                    <p class="text-secondary mb-0">${content}</p>
                </div>
    `);

}