import { uiModules } from "ui/modules"

uiModules.get('app/logtrail', []).directive('formatEvent', function() {
  return {
    scope: true,
    link: function (scope, element, attr) {
      element.on('click', function(clickEvent) {
        var argElement = angular.element(clickEvent.target);
        var argNum = argElement.data('argnum');
        //in case of highlight span will be the target. then search for parent.
        if (!argNum) {
          argNum = argElement.parent().data('argnum');
        }
        if (argNum) {
          var patternInfo = scope.event.patternInfo;
          var matchIndices = patternInfo.matchIndices;
          var text = scope.event.raw_message.substring(matchIndices[argNum * 2 - 2],matchIndices[argNum * 2 -1]);
          if (event.shiftKey) {
            var searchString = 'logtrail.patternId:' + patternInfo.patternId + ' AND logtrail.a' + argNum + ':"' + text + '"';
            //e.g searchString : logtrail.patternId:AV6ZmVeGVcFBgzHpAO3k AND logtrail.a1:"/10.196.68.149:3570"
            scope.search({
              searchString: searchString
            });
          } else if (event.altKey) {
            var searchString = '"' + text + '"';
            //e.g searchString : "/10.196.68.149:3570"
            scope.search({
              searchString: searchString
            });
          } else {
            scope.argPopup.style.display = 'block';
            scope.argPopup.style.left = clickEvent.clientX;
            scope.argPopup.style.top = clickEvent.clientY;
            scope.argPopup.eventId = scope.event.id;
            scope.argPopup.text = text;
            scope.argPopup.className = scope.event.sourcePattern.context;
            scope.argPopup.methodName = scope.event.sourcePattern.method;
            scope.argPopup.variableName = scope.event.sourcePattern.args[argNum-1];
            scope.$apply();
          }
          
        }
      });

      element.on('mouseover', function (mouseOverEvent) {
        var argElement = angular.element(mouseOverEvent.target);
        var argNum = argElement.data('argnum');
        //in case of highlight span will be the target. then search for parent.
        if (!argNum) {
          argNum = argElement.parent().data('argnum');
        }
        if (argNum) {
          
        }
      });
    }
  }
});