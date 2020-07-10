class Attempt {
  constructor(
    activeIndex,
    index,
    type,
    tries,
    submissionCount,
    completion,
    tabID,
    disabled
  ) {
    this.activeIndex = activeIndex;
    this.index = index;
    this.type = type;
    this.tries = tries;
    this.submissionCount = submissionCount;
    this.completion = completion;
    this.tabID = tabID;
    this.disabled = disabled;
  }
}
class Navigation {
  constructor(
    index,
    questionType,
    smallTabID,
    tabID,
    contentID,
    submitID,
    activeIndex,
    disabled
  ) {
    this.index = index;
    this.questionType = questionType;
    this.smallTabID = smallTabID;
    this.tabID = tabID;
    this.contentID = contentID;
    this.submitID = submitID;
    this.activeIndex = activeIndex;
    this.disabled = disabled;
  }
}
