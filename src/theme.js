$(document).on('ready page:load', function () {
  (function() {
    $('#context-menu').on('mouseenter', '.folder', function () {
      var
        $submenu = $(this).find('ul'),
        overflow = window.innerHeight - $submenu.innerHeight() - $submenu.offset().top;
      if ( overflow < 0 ) {
        $submenu.css('margin-top', overflow);
      }
    });
    $('#q').focus( function () {
      $('body').addClass('showMenu')
    });
    $('#q').blur( function () {
      $('body').removeClass('showMenu')
    });
  })();

  // Redspot Plugin Code
 (function(){$('<script src="https://cdnjs.cloudflare.com/ajax/libs/fuse.js/2.6.1/fuse.min.js"/>').appendTo('body');var template=`
  <div class="Redspot">
    <style class="Redspot__css"></style>
    <i class="Redspot__icon"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25"><g fill="none" fill-rule="evenodd"><path d="M-4-4h34v34H-4z"/><path fill="#FFF" fill-rule="nonzero" d="M17.958 15.833H16.84l-.396-.382a9.168 9.168 0 0 0 2.224-5.993A9.208 9.208 0 0 0 9.458.25 9.208 9.208 0 0 0 .25 9.458a9.208 9.208 0 0 0 9.208 9.209c2.281 0 4.378-.836 5.993-2.225l.382.397v1.12l7.084 7.069 2.11-2.111-7.069-7.084zm-8.5 0a6.366 6.366 0 0 1-6.375-6.375 6.366 6.366 0 0 1 6.375-6.375 6.366 6.366 0 0 1 6.375 6.375 6.366 6.366 0 0 1-6.375 6.375z"/></g></svg></i>
    <input type="text" placeholder="Projets Redmine" class="Redspot__input">
    <div class="Redspot__results">
      <ul class="Redspot__resultList">
      </ul>
    </div>
  </div>
  `;$('body').append(template);var projectList=[];var filtered=[];var resultList=$('.Redspot__resultList');var resultLinks=$('.Redspot__resultLinks');var redspotInput=$('.Redspot__input');var redspot=$('.Redspot');var fuse;var fuse_options={include:['score'],shouldSort:true,threshold:0.6,location:0,tokenize:true,distance:100,maxPatternLength:32,minMatchCharLength:2,keys:['name']};function projectLink(project){var link=$('<a/>');link.text(project.name);link.attr('href',project.url);link.attr('data-project',project.name);return link[0]}function createProjectList(){console.log('createProjectList');$('#project_quick_jump_box option').each(function(){var str=this.value.match(/\/projects\/(.*)\?.*/);if(str!==null)projectList.push({name:this.innerText.split('\xBB').pop(),url:this.value})});filter=new Fuse(projectList,fuse_options)}function displayProjects(filtered){console.log('displayProjects');var list=[];$(filtered).each(function(i){var project=filtered[i].item;var li=$('<li/>').append(projectLink(project));list.push(li)});$(resultList).html(list)}function showRedspot(){console.log('showRedspot');if(projectList.length===0){createProjectList()}initControl();redspot.toggleClass('display');redspotInput.focus()}function hideRedspot(){console.log('hideRedspot');redspot.toggleClass('display');redspotInput.val('');$(resultList).empty();redspotInput.unbind('keyup')}function toggleRedspot(){if(redspot.hasClass('display')){hideRedspot()}else{showRedspot()}}function initControl(){console.log('initControl');redspotInput.on('keyup',function(e){switch(e.keyCode){case 27:e.stopPropagation();toggleRedspot();break;case 13:window.location=filtered[0].item.url;break;default:filtered=filter.search($(this).val());displayProjects(filtered);}})}$(document).ready(function(){$(this).on('keyup',function(e){console.log(e.keyCode);if(e.keyCode===27){toggleRedspot()}})})})();

});