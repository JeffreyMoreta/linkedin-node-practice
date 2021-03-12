// click #profile_btn to display profiles from http://localhost:8080/students inside of #profiles_container
const getProfile    = document.querySelector('#template-grabstudent-pull');
const submitProfile = document.querySelector('#template-contactform-submit');

const updateProfiles = map => document.querySelector('#portfolio').innerHTML = map

const createStudentCards = ({ name, company, linkedIn, picture, role }, index) => {
    return `<!-- Portfolio Item: Start -->
    <article class="portfolio-item col-12 col-sm-6 col-md-4 pf-media pf-icons">
        <!-- Grid Inner: Start -->
        <div class="grid-inner">
            <!-- Image: Start -->
            <div class="portfolio-image">
                <a href="${linkedIn}" target="_blank">
                    <img src='${picture}' alt="${name}'s Photo">
                </a>
            </div>
            <!-- Image: End -->
            <!-- Decription: Start -->
            <div class="portfolio-desc">
                <h3><a href="${linkedIn}" target="_blank">${name}</a></h3>
                <span>${role}, ${company}</span>
                <div class="row m-1" data-id="${index}">
                    <button class="button remove">Remove</button>
                    <button class="button" data-toggle="modal" data-target=".bs-example-modal-lg">Edit</button>
                </div>
            </div>
            <!-- Description: End -->
        </div>
        <!-- Grid Inner: End -->
    </article>
    <!-- Portfolio Item: End -->`
}

const updateStudents = async () => {
    await fetch('/students')
    .then(res => res.json())
    .then(({ students }) => {
        updateProfiles(students.map(createStudentCards).join(''))

        const removeButtons = [...document.querySelectorAll('.remove')];
        const editButtons   = [...document.querySelectorAll('.edit')];
        
        removeButtons.forEach(button =>
            button.addEventListener('click', ({ target:{ parentNode:{ attributes:{ 'data-id': { value: index }}}}}) => {
                fetch('/students', {
                    method: 'delete',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ index })
                })
                    .then(res => res.json())
                    .then(({ removed }) => removed ? window.location.reload() : console.error("Remove has failed"))
            })
        )
        
        editButtons.forEach(button =>
            button.addEventListener('click', ({ target:{ parentNode:{ attributes:{ 'data-id': { value: index }}}}}) => {
                fetch('/students', {
                    method: 'get',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ index })
                })
                    .then(res => res.json())
                    .then(({ removed }) => removed ? window.location.reload() : console.error("Remove has failed"))
            })
        )
    })
}

updateStudents()
getProfile.addEventListener('click', updateStudents)
submitProfile.addEventListener('click', () => window.location.reload())