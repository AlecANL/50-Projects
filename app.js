const $projects = document.getElementById('projects')

fetch('./projects.json')
  .then(response => response.json())
  .then(data => {
    render(data)
  })

function render(projects) {
  projects.forEach((project, idx) => {
    const $project = document.createElement('div')
    $project.innerHTML = buildProjectItem(project, idx)
    $projects.append($project.firstElementChild)
  })
}

function buildProjectItem(project, id) {
  return `
        <article class="project">
            <span> ${id + 1} </span>
            <div>
                <h3>${project.name}</h3>
                <a target="_blank" href="${project.url}"> Live Demo </a>
            </div>
        </article>
            `
}
