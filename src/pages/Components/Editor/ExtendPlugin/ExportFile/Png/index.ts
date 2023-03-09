import html2canvas from 'html2canvas'

const EDITOR_PNG_ID = 'editor_export_png'

export const getPng = async (html: string, parent: HTMLElement) => {
  parent.innerHTML = ''
  const element = document.createElement('div')
  element.innerHTML = html

  element.classList.add(EDITOR_PNG_ID)

  // fix: 匹配wantEditor的样式
  element.setAttribute('data-slate-editor', 'element')
  parent.appendChild(element)

  const canvas = await html2canvas(element)
  canvas.style.width = '100%'
  canvas.style.height = '100%'

  parent.removeChild(element)
  parent.append(canvas)

  return canvas
}
