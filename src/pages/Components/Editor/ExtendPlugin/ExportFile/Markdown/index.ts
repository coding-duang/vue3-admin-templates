import TurndownService from 'turndown'

export const getMD = (html: string, parent: HTMLElement) => {
  console.log('html', html)
  const turndownService = new TurndownService({
    headingStyle: 'atx',
  })

  const txt = turndownService.turndown(html)

  const textarea = document.createElement('textarea')
  textarea.readOnly = true
  textarea.value = txt

  parent.innerHTML = ''
  parent.append(textarea)
  return txt
}
