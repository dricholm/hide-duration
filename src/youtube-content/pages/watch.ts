import { hidePlayerOverlay } from '../css-classes';
import { filterByName } from '../utils';
import { getChannels } from '../store';

export const disconnectWatch = () => {
  relatedObserver.disconnect();
};

export const relatedObserver: MutationObserver = new MutationObserver(
  mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => filterByName(node as Element));
    });
  }
);

const player = () => {
  const metaContents = document.querySelector('ytd-watch-flexy #meta-contents');
  if (metaContents == null) {
    console.warn('#meta-contents not found');
    return;
  }

  if (metaContents.childNodes.length === 0) {
    onMetaContentsLoad(metaContents);
  } else {
    onMetaContentsAlreadyLoaded();
  }
};

const relatedVideos = () => {
  const relatedVideosContainer = document.querySelector(
    'ytd-watch-next-secondary-results-renderer #items'
  );

  if (relatedVideosContainer == null) {
    console.warn('Related videos not found');
    return;
  }

  if (relatedVideosContainer.childElementCount > 0) {
    // After first watch load
    // Check 20th element of container for a[href] change
    // 20th element is the last loaded by default
    const lastElement = relatedVideosContainer.childNodes[19] as Element;
    const anchor = lastElement.querySelector('a');
    if (anchor == null) {
      console.warn('Anchor not found');
      return;
    }

    new MutationObserver((_, mutation) => {
      relatedVideosContainer.childNodes.forEach(node => {
        filterByName(node as Element);
      });
      mutation.disconnect();
    }).observe(anchor, {
      attributes: true,
      attributeFilter: ['href'],
    });
  }

  // Check for child nodes of container
  // Triggered on initial load and on scroll
  relatedObserver.observe(relatedVideosContainer, {
    childList: true,
  });
};

const setPlayerOverlays = (show: boolean) => {
  const ytdPlayer = document.querySelector('ytd-player');
  if (ytdPlayer == null) {
    console.warn('Player not found');
    return;
  }

  if (show) {
    ytdPlayer.classList.remove(hidePlayerOverlay);
  } else {
    ytdPlayer.classList.add(hidePlayerOverlay);
  }
};

const onMetaContentsLoad = (observedElement: Element) => {
  new MutationObserver((_, observer) => {
    const ownerElement = document.querySelector(
      '#owner-container > #owner-name'
    );
    if (ownerElement == null) {
      console.warn('Owner not found');
      return;
    }

    const anchor = ownerElement.querySelector('a');
    if (anchor == null) {
      console.warn('Owner anchor not found');
      return;
    }

    if (anchor.textContent == null) {
      console.warn('Anchor textContent is null');
      observer.disconnect();
      return;
    }

    setPlayerOverlays(
      !getChannels()
        .map(channel => channel.name)
        .includes(anchor.textContent)
    );

    observer.disconnect();
  }).observe(observedElement, {
    childList: true,
  });
};

const onMetaContentsAlreadyLoaded = () => {
  const ownerElement = document.querySelector('#owner-container > #owner-name');
  if (ownerElement == null) {
    console.warn('Owner not found');
    return;
  }

  if (ownerElement.childNodes.length === 0) {
    onOwnerNotYetLoaded(ownerElement);
  } else {
    onOwnerLoaded(ownerElement);
    // After first load check href attribute of child
  }
};

const onOwnerNotYetLoaded = (ownerElement: Element) => {
  new MutationObserver((_, observer) => {
    if (ownerElement.textContent) {
      setPlayerOverlays(
        !getChannels()
          .map(channel => channel.name)
          .includes(ownerElement.textContent)
      );
    }
    observer.disconnect();
  }).observe(ownerElement, {
    childList: true,
  });
};

const onOwnerLoaded = (ownerElement: Element) => {
  const anchor = ownerElement.querySelector('a');
  if (anchor == null) {
    console.warn('Owner anchor not found');
    return;
  }

  new MutationObserver((_, observer) => {
    if (anchor.textContent == null) {
      console.warn('Anchor textContent is null');
      observer.disconnect();
      return;
    }

    setPlayerOverlays(
      !getChannels()
        .map(channel => channel.name)
        .includes(anchor.textContent)
    );
    observer.disconnect();
  }).observe(anchor, {
    attributes: true,
    attributeFilter: ['href'],
  });
};

export const watchPage = () => {
  player();
  relatedVideos();
};
