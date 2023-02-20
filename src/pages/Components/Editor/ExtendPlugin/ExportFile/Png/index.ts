import html2canvas from 'html2canvas'

const EDITOR_PNG_ID = 'editor_export_png'

export const getPng = async (html: string, parent: HTMLElement) => {
  const element = document.createElement('div')
  element.innerHTML = html

  element.classList.add(EDITOR_PNG_ID)

  // fix: 匹配wantEditor的样式
  element.setAttribute('data-slate-editor', 'element')

  parent.appendChild(element)

  const canvas = await html2canvas(element, {
    allowTaint: true,
  })

  const img = document.createElement('img')
  img.src = canvas.toDataURL('image/png')
  img.style.width = '100%'
  img.style.height = '100%'
  img.style.objectFit = 'fill'

  parent.innerHTML = ''
  parent.append(img)
}
