export function autoResize(el: HTMLTextAreaElement | null): void {
  if (el) {
    el.style.height = "auto";
    el.style.overflow = "hidden";
    el.style.height = el.scrollHeight + "px";
  }
}
