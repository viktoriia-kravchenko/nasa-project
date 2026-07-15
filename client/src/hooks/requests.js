const API_URP = "http://localhost:8000";

async function httpGetPlanets() {
  const res = await fetch(`${API_URP}/planets`);

  return await res.json();
}

async function httpGetLaunches() {
  const res = await fetch(`${API_URP}/launches`);
  const allLaunches = await res.json();

  return allLaunches.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URP}/launches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URP}/launches/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error(error);
    return { ok: false };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
