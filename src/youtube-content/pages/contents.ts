import { thumbnailSelector } from '../css-classes';
import { filterByName } from '../utils';

let contentsObservers: Array<MutationObserver> = [];

const contentsObserverCallback = (mutations: Array<MutationRecord>) => {
  mutations.forEach(mutation =>
    mutation.addedNodes.forEach(newNode =>
      (newNode as Element)
        .querySelectorAll(thumbnailSelector)
        .forEach(filterByName)
    )
  );
};

export const checkContents = () => {
  const contents = document.querySelectorAll(
    'ytd-section-list-renderer > #contents'
  );

  if (contents.length === 0) {
    console.warn('#contents not found');
    return;
  }

  contents.forEach(element => {
    const observer = new MutationObserver(contentsObserverCallback);
    contentsObservers.push(observer);
    observer.observe(element, { childList: true });
  });
};

export const disconnectContents = () => {
  contentsObservers.forEach(observer => observer.disconnect());
  contentsObservers = [];
};
