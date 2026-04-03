const copyBtn = document.querySelector(".copy-link-news");
  const toast = document.querySelector(".copy-toast");

  copyBtn.addEventListener("click", () => {
    const link = copyBtn.getAttribute("data-link");

    navigator.clipboard.writeText(link).then(() => {
      toast.classList.add("show");

      setTimeout(() => {
        toast.classList.remove("show");
      }, 2000);
    });
  });