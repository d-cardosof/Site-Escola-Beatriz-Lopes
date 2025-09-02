const btnTopo = document.createElement("button");
btnTopo.textContent = "⬆ Topo";
btnTopo.style.position = "fixed";
btnTopo.style.bottom = "20px";
btnTopo.style.right = "20px";
btnTopo.style.display = "none";
btnTopo.style.padding = "10px 15px";
btnTopo.style.borderRadius = "8px";
btnTopo.style.border = "none";
btnTopo.style.background = "#CB6D43";
btnTopo.style.color = "white";
btnTopo.style.cursor = "pointer";
btnTopo.style.zIndex = "999";
document.body.appendChild(btnTopo);

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    btnTopo.style.display = "block";
  } else {
    btnTopo.style.display = "none";
  }
});

btnTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ==========================
// Destacar seção ativa no menu
// ==========================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let atual = "";
  sections.forEach(sec => {
    const topo = sec.offsetTop - 70;
    const altura = sec.offsetHeight;
    if (scrollY >= topo && scrollY < topo + altura) {
      atual = sec.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${atual}`) {
      link.classList.add("active");
    }
  });
});

// ==========================
// Validação do formulário de contato (index.html)
// ==========================
const form = document.querySelector("form");

if (form) {
  // cria mensagens de erro dinamicamente se não existirem
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const mensagem = document.getElementById("mensagem");

  function criarErroMsg(input, id, texto) {
    let erro = document.getElementById(id);
    if (!erro) {
      erro = document.createElement("div");
      erro.id = id;
      erro.className = "erro-msg";
      erro.style.color = "red";
      erro.style.fontSize = "0.9rem";
      erro.style.marginTop = "4px";
      erro.style.display = "none";
      erro.textContent = texto;
      input.insertAdjacentElement("afterend", erro);
    }
    return erro;
  }

  const erroNome = criarErroMsg(nome, "erro-nome", "⚠️ Por favor, insira seu nome.");
  const erroEmail = criarErroMsg(email, "erro-email", "⚠️ Digite um email válido.");
  const erroMensagem = criarErroMsg(mensagem, "erro-mensagem", "⚠️ Escreva sua mensagem.");

  // mensagem de sucesso
  let sucessoMsg = document.getElementById("sucesso-msg");
  if (!sucessoMsg) {
    sucessoMsg = document.createElement("div");
    sucessoMsg.id = "sucesso-msg";
    sucessoMsg.className = "sucesso-msg";
    sucessoMsg.style.display = "none";
    sucessoMsg.style.marginTop = "15px";
    sucessoMsg.style.padding = "15px";
    sucessoMsg.style.borderRadius = "8px";
    sucessoMsg.style.background = "#d4edda";
    sucessoMsg.style.color = "#155724";
    sucessoMsg.style.fontWeight = "bold";
    sucessoMsg.style.textAlign = "center";
    sucessoMsg.textContent = "✅ Sua mensagem foi enviada com sucesso!";
    form.appendChild(sucessoMsg);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valido = true;

    if (nome.value.trim() === "") {
      erroNome.style.display = "block";
      valido = false;
    } else {
      erroNome.style.display = "none";
    }

    const regexEmail = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    if (!regexEmail.test(email.value.trim())) {
      erroEmail.style.display = "block";
      valido = false;
    } else {
      erroEmail.style.display = "none";
    }

    if (mensagem.value.trim() === "") {
      erroMensagem.style.display = "block";
      valido = false;
    } else {
      erroMensagem.style.display = "none";
    }

    if (valido) {
      sucessoMsg.style.display = "block";
      form.reset();
      setTimeout(() => {
        sucessoMsg.style.display = "none";
      }, 4000);
    }
  });
}
