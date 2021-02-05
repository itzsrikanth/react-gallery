export const findKeyframe = (name: string): CSSKeyframesRule | null => {
  for(let i = 0; i < document.styleSheets.length; i++) {
    const ruleList: CSSRuleList | undefined = document.styleSheets.item(i)?.rules;
    if (ruleList) {
      for(let j = 0; j < ruleList.length; j++) {
        const kfRule: CSSKeyframesRule | null = ruleList.item(j) as CSSKeyframesRule;
        if (
          kfRule?.type === CSSRule.KEYFRAMES_RULE &&
          kfRule?.name === name
        ) {
          return kfRule;
        }
      }
    }
  }
  return null;
};
