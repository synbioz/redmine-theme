(function () {

  var
    projectList = [],
    filter,
    filtered = [],
    resultList,
    resultLinks,
    redspotInput,
    redspotLabel,
    redspot,
    currentFocusIndex = 0,
    lastSearchLength = 0,
    fuse,
    fuse_options = {
      include: ["score"],
      shouldSort: true,
      tokenize: true,
      matchAllTokens: true,
      threshold: 0.1,
      location: 0,
      distance: 1000,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: [
        "name"
      ]
    },
    commands =  [
      {
        title: "Activité",
        alias: ["/a", "/activity"],
        url: "/activity"
      }, {
        title: "Roadmap",
        alias: ["/r", "/roadmap"],
        url: "/roadmap"
      }, {
        title: "Demandes",
        alias: ["/#", "/i", "/issues"],
        url: "/issues"
      }, {
        title: "Nouvelle demande",
        alias: ["/+", "/n", "/new"],
        url: "/issues/new"
      }, {
        title: "Gantt",
        alias: ["/g", "/gantt"],
        url: "/issues/gantt"
      }, {
        title: "Calendar",
        alias: ["/c", "/calendar"],
        url: "/issues/calendar"
      }, {
        title: "Annonces",
        alias: ["/n", "/news"],
        url: "/news"
      }, {
        title: "Documents",
        alias: ["/d", "/documents"],
        url: "/documents"
      }, {
        title: "Wiki",
        alias: ["/w", "/wiki"],
        url: "/wiki"
      }, {
        title: "Wiki by date",
        alias: ["/wd"],
        url: "/wiki/date_index"
      }, , {
        title: "Wiki by title",
        alias: ["/wt"],
        url: "/wiki/index"
      }, {
        title: "Files",
        alias: ["/f", "/files"],
        url: "/files"
      }, {
        title: "Configuration",
        alias: ["/s", "/settings"],
        url: "/settings"
      }
    ],
    aliases = [],
    template = `
      <div class="Redspot">
        <i class="Redspot__icon"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25"><g fill="none" fill-rule="evenodd"><path d="M-4-4h34v34H-4z"/><path fill="#FFF" fill-rule="nonzero" d="M17.958 15.833H16.84l-.396-.382a9.168 9.168 0 0 0 2.224-5.993A9.208 9.208 0 0 0 9.458.25 9.208 9.208 0 0 0 .25 9.458a9.208 9.208 0 0 0 9.208 9.209c2.281 0 4.378-.836 5.993-2.225l.382.397v1.12l7.084 7.069 2.11-2.111-7.069-7.084zm-8.5 0a6.366 6.366 0 0 1-6.375-6.375 6.366 6.366 0 0 1 6.375-6.375 6.366 6.366 0 0 1 6.375 6.375 6.366 6.366 0 0 1-6.375 6.375z"/></g></svg></i>
        <div class="Redspot__actionLabel"></div>
        <input type="text" placeholder="Recherche Redspot" class="Redspot__input">
        <div class="Redspot__results">
          <ul class="Redspot__resultList">
          </ul>
          <ul class="Redspot__help">
            <li>Pour chaque projets :</li>
            <li>/# Liste des demandes</li>
            <li>/+ Nouvelle demande</li>
            <li>/w Wiki</li>
            <li>/s Configuration</li>
            <li><a href="https://support.synbioz.com/projects/redmine-synbioz/wiki/Redspot" target="_blank">Et plus encore</a></li>
          </ul>
        </div>
      </div>`
    ;

  function createAliases(commands) {
    aliases = commands.reduce( function(curAliases, command){
      // For each commands,
      command.alias.forEach( function(alias){
        curAliases[alias] = command;
      })
      return curAliases;
    }, {})
  }

  function interpreter(value) {
    return {
      bang: value.split(' ').filter( word => word[0] === '/' ).pop(),
      search: value.split(' ').filter( word => word[0] !== '/').join(' ')
    }
  }


  // Create a link for project.object
  function projectLink(project) {
    var link = $('<a/>');
    link.text(project.name);
    link.attr("href", project.url);
    link.attr('data-project', project.name);
    link.attr('class', 'Redspot__project');
    link.attr('tabindex', "-1");
    return link[0];
  }

  function createProjectList() {
    // console.log('createProjectList');
    if ($('#project_quick_jump_box').length !== 0) {
      $('#project_quick_jump_box option').each(function () {
        var str = this.value.match(/\/projects\/(.*)\?.*/);
        if ( str !== null ) projectList.push({
          name: this.innerText.split("»").pop().trim(),
          url: this.value
        });
      })
    } else {
      console.error("Can't create the project list")
    }

    filter = new Fuse(projectList, fuse_options);
  }

  function render(filtered) {
    // console.log('render');
    var list = [];
    filtered.forEach( function(i){
      var project = i.item;
      list.push( projectLink(project) )
    })
    $(resultList).html( list );
    updateCurrentLabel();
    updateFocusedLink(currentFocusIndex);
  }

  function updateCurrentLabel() {
    let currentBang = interpreter( redspotInput.val() ).bang;
    let currentProject = filtered[currentFocusIndex];

    if ( currentBang !== undefined && currentProject !== undefined ) {
      let page = aliases[currentBang].title;
      redspotLabel.html(page + ' - ' + currentProject.item.name);
    } else if (currentProject !== undefined) {
      redspotLabel.html('Go to ' + currentProject.item.name);
    } else {
      redspotLabel.html('');
    }
  }

  function showRedspot() {
    // console.log('showRedspot');
    if (projectList.length === 0) {
      createProjectList();
    }
    initControl();

    redspot.addClass('display');
    redspotInput.focus()
  }

  function hideRedspot() {
    // console.log('hideRedspot');
    redspot.removeClass('display');
    redspotInput.val("");
    $(resultList).empty();
    redspotInput.unbind('keyup');
  }

  function toggleRedspot() {
    if (redspot.hasClass('display')) {
      hideRedspot();
    } else {
      showRedspot();
    }
  }

  function updateFocusedLink(index) {
    $('.Redspot__project--focused').removeClass('Redspot__project--focused');
    $('.Redspot__project').eq(index).addClass('Redspot__project--focused');
    updateCurrentLabel();
  }

  /*
    Redirecter args:

      filtered: Array of Object
        list of all projects processed by fusejs
        For each object:
          item:
            name: 'ffepgv'
            url: '/projects/ifederation?jump=overview'
          score: 0.006
      focusIndex: Integer
        index of the focused or clicked project (default: 0)
      interpreted: Object
        contain [bang] and [search] (ex: "ffe")
  */

  function redirecter(filtered, focusIndex, interpreted) {
    let url = filtered[focusIndex].item.url;

    if (interpreted.bang !== undefined) {
      // Go to page !bang of the selected project
      window.location = "https://support.synbioz.com/" + url.split('?').shift() + aliases[interpreted.bang].url
    } else {
      // Go to selected project
      window.location = "https://support.synbioz.com/" + url
    }
  }
  function initControl() {
    redspot.on('click', function(e){
      e.preventDefault();e.stopPropagation();
      if ($(e.target).hasClass('Redspot__project')) {
        redirecter(filtered, $(e.target).index(), interpreter(redspotInput.val()))
      };
    })
    // console.log('initControl');
    redspotInput.on('keyup', function (e) {
      // console.log(e.keyCode)
      switch (e.keyCode) {
        case 27:
          // Escape Key
          e.stopPropagation();
          toggleRedspot();
          break;
        case 13:
          // Enter Key
          redirecter( filtered, currentFocusIndex, interpreter( $(this).val() ) );
          break;
        default:
          if ($(this).val().length !== lastSearchLength) {
            currentFocusIndex = 0;
            lastSearchLength = $(this).val().length
            const projectName = interpreter($(this).val()).search
            filtered = filter.search(projectName);
            render( filtered );
          }
          break;
      }
    });
    redspotInput.on('keydown', function(e){
      switch (e.keyCode) {
        case 38:
          // arrow top
          e.preventDefault();e.stopPropagation();
          currentFocusIndex = Math.max(0, currentFocusIndex-1);
          updateFocusedLink(currentFocusIndex);
          break;
        case 40:
          // arrow bottom
          e.preventDefault();e.stopPropagation();
          currentFocusIndex = Math.min(filtered.length-1, currentFocusIndex+1);
          updateFocusedLink(currentFocusIndex);
          break;
      }
    });
  }

  $(document).ready( function () {

    $("body").append(template);

    resultList = $('.Redspot__resultList');
    resultLinks = $('.Redspot__resultLinks');
    redspotInput = $('.Redspot__input');
    redspotLabel = $('.Redspot__actionLabel');
    redspot = $('.Redspot');
    createAliases(commands);

    $(this).on('keyup', function (e) {
      // console.log(e.keyCode)
      if (e.keyCode === 27) {
        toggleRedspot()
      }
    })
  })
})();