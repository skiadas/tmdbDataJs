import {
  allGenreIds,
  genreIdsByName,
  genreNamesById,
  moviesForGenreId,
  withPopularityAtLeast,
  getTitles,
  computeAvgPopularity,
} from "./script.mjs";

let popularityCutoff = 100;
let currentGenre: string | null = null;

if (document.readyState !== "loading") {
  myInitCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    myInitCode();
  });
}

function myInitCode() {
  const $genreCount = document.querySelector("#genreCount");
  if (!$genreCount) throw new Error();
  $genreCount.innerHTML = String(allGenreIds.length);
  const $genresList = document.querySelector("#genresList")!;
  $genresList.insertAdjacentHTML(
    "beforeend",
    allGenreIds
      .map((id) => {
        const name = genreNamesById.get(id);
        return `<li>${name}</li>`;
      })
      .join("\n")
  );
  $genresList.addEventListener("click", (ev) => {
    const target = ev.target as HTMLElement;
    if (target.tagName.toLowerCase() != "li") return;
    currentGenre = target.textContent;
    updateStuff();
  });
  document.querySelector("#popularityCutoff")!
    .addEventListener("change", (ev) => {
      popularityCutoff = Number((ev.target as HTMLInputElement).value);
      updateStuff();
    });
}

function updateStuff() {
  if (!currentGenre) return;
  const id = genreIdsByName.get(currentGenre)!;
  document.querySelector("#genreDetails h2")!.textContent = `${currentGenre} (id ${id})`;
  const movies = withPopularityAtLeast(moviesForGenreId(id), popularityCutoff);
  document.querySelector("#movieCount")!.textContent = `${movies.length}`;
  document.querySelector("#avgPopularity")!.textContent = `${computeAvgPopularity(movies)}`;
  document.querySelector("#movieList")!.innerHTML = getTitles(movies)
    .map((m) => `<li>${m}</li>`)
    .join("\n");
}
