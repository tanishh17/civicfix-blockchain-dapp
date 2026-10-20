let provider;
let signer;
let contract;
let currentAccount = "";

const statusNames = ["Open", "Claimed", "Completed", "Cancelled"];
const el = (id) => document.getElementById(id);

function notify(message, isError = false) {
  const toast = el("toast");
  toast.textContent = message;
  toast.style.background = isError ? "#7f1d1d" : "#13251b";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 4500);
}

function shortAddress(address) {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "None";
}

function readableError(error) {
  return error?.revert?.args?.[0] || error?.reason || error?.shortMessage || error?.message || "Transaction failed";
}

async function connectWallet() {
  if (!window.ethereum) return notify("MetaMask was not detected. Install or enable the extension.", true);
  if (!ethers.isAddress(CONTRACT_ADDRESS)) return notify("Add the deployed contract address in config.js first.", true);
  try {
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    currentAccount = (await signer.getAddress()).toLowerCase();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const network = await provider.getNetwork();

if (network.chainId !== 1337n) {
  contract = null;

  notify(
    `Wrong network! Current chain ID: ${network.chainId}. Switch to Ganache Local.`,
    true
  );

  return;
} catch (error) { notify(readableError(error), true); }
}

async function runTransaction(send, successMessage) {
  try {
    const transaction = await send();
    notify(`Transaction submitted: ${shortAddress(transaction.hash)}`);
    await transaction.wait();
    notify(successMessage);
    await refreshData();
  } catch (error) { notify(readableError(error), true); }
}

async function refreshData() {
  if (!contract) return;
  try {
    const [community, completed, items] = await Promise.all([
      contract.communityName(), contract.completedCount(), contract.getAllRequests()
    ]);
    el("communityName").textContent = community;
    el("completedCount").textContent = completed.toString();
    renderRequests(items);
  } catch (error) { notify(readableError(error), true); }
}

function renderRequests(items) {
  const list = el("requestList");
  if (!items.length) { list.innerHTML = '<p class="empty">No repair requests have been published yet.</p>'; return; }
  list.innerHTML = [...items].reverse().map((item) => {
    const id = item.id.toString();
    const status = Number(item.status);
    const isRequester = item.requester.toLowerCase() === currentAccount;
    const actions = [];
    if (status === 0 && !isRequester) actions.push(`<button class="primary" onclick="claim('${id}')">Claim</button>`);
    if (status === 0 && isRequester) actions.push(`<button class="danger" onclick="cancelRequest('${id}')">Cancel</button>`);
    if (status === 1 && isRequester) actions.push(`<button class="primary" onclick="complete('${id}')">Confirm completion</button>`);
    return `<article class="card">
      <div class="card-top"><span class="badge">${statusNames[status]}</span><strong>#${id}</strong></div>
      <h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.details)}</p>
      <div class="meta"><strong>Location:</strong> ${escapeHtml(item.location)}<br>
      <strong>Requester:</strong> ${shortAddress(item.requester)}<br><strong>Volunteer:</strong> ${shortAddress(item.volunteer)}</div>
      <div class="actions">${actions.join("")}</div></article>`;
  }).join("");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
}

el("requestForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!contract) return notify("Connect MetaMask first.", true);
  const title = el("title").value.trim();
  const location = el("location").value.trim();
  const details = el("details").value.trim();
  await runTransaction(() => contract.createRequest(title, location, details), "Repair request created successfully.");
  event.target.reset();
});

async function claim(id) { await runTransaction(() => contract.claimRequest(id), "Repair request claimed successfully."); }
async function complete(id) { await runTransaction(() => contract.completeRequest(id), "Completion recorded on-chain."); }
async function cancelRequest(id) { await runTransaction(() => contract.cancelRequest(id), "Repair request cancelled."); }

el("connectButton").addEventListener("click", connectWallet);
el("refreshButton").addEventListener("click", refreshData);
if (window.ethereum) {
  window.ethereum.on("accountsChanged", () => location.reload());
  window.ethereum.on("chainChanged", () => location.reload());
}
