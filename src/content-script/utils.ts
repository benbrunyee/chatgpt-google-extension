import Browser from 'webextension-polyfill'

export function getPossibleElementByQuerySelector<T extends Element>(
  queryArray: string[],
): T | undefined {
  for (const query of queryArray) {
    const element = document.querySelector(query)
    if (element) {
      return element as T
    }
  }
}

export function endsWithQuestionMark(question: string) {
  return (
    question.endsWith('?') || // ASCII
    question.endsWith('？') || // Chinese/Japanese
    question.endsWith('؟') || // Arabic
    question.endsWith('⸮') // Arabic
  )
}

export function isBraveBrowser() {
  return (navigator as any).brave?.isBrave()
}

export async function shouldShowRatingTip() {
  const { ratingTipShowTimes = 0 } = await Browser.storage.local.get('ratingTipShowTimes')
  if (ratingTipShowTimes >= 5) {
    return false
  }
  await Browser.storage.local.set({ ratingTipShowTimes: ratingTipShowTimes + 1 })
  return ratingTipShowTimes >= 2
}

export function isCarouselSearch() {
  const carousel = document.querySelector('g-scrolling-carousel.pla-carousel')
  return carousel !== null
}

export function offsetContainer<T extends HTMLElement>(
  element: T,
  offsets: { top?: number; left?: number },
) {
  if (offsets.top) {
    element.style.transform = `translateY(${offsets.top}px) `
  }

  if (offsets.left) {
    element.style.transform += `translateX(${offsets.left}px)`
  }
}
