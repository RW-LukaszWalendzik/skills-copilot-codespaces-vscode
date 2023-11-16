function skillsMember() {
  return {
    restrict: 'E',
    templateUrl: 'app/components/skills/member.html',
    controller: 'SkillsMemberCtrl',
    controllerAs: 'vm',
    bindToController: true,
    scope: {
      member: '=',
      skills: '='
    }
  };
}