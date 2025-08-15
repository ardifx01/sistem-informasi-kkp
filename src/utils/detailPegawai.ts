export const ANIMATION_DELAYS = {
  LOGO: "0ms",
  TITLE: "200ms",
  SUBTITLE: "400ms",
  BADGE: "100ms",
  CONTACT_CARD: "100ms",
  STATUS_CARD: "400ms",
  PERSONAL_CARD_BASE: 10, // ms per card
  CONTACT_ITEM_BASE: 100, // ms + (index * 80)
  CONTACT_ITEM_MULTIPLIER: 80,
};

export const getAnimationProps = (isLoaded: boolean, delay: string) => ({
  className: `transition-all duration-600 ease-out ${
    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
  }`,
  style: {
    transitionDelay: delay,
    animation: isLoaded ? `fadeInUp 0.6s ease-out ${delay} forwards` : "",
  },
});
