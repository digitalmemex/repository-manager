/*global $, RESTClient*/

$(function() { // jQuery ready => start up
  var dmc = new RESTClient('/core'),
      repositories = dmc.get_topics('dmx.repository', true, true),
      $table = $('#repositories').empty(),
      renderRepository = function (t) {
        var name = t.childs['dmx.repository.name'].value,
            desc = t.childs['dmx.repository.description'].value,
            status = t.childs['dmx.repository.status'],
            $row = $('<tr>');
        if (status && status.uri === 'dmx.repository.status.installed') {
          $row.append($('<td>').append($('<a>').text(name).attr('href', '/dmx/application/' + name)));
          $row.append($('<td>').text(desc));
          $row.append($('<td>').append($('<a>').text('update').attr('href', '/dmx/repository/' + name + '/pull')));
        } else { // configured?
          $row.append($('<td>').text(name));
          $row.append($('<td>').text(desc));
          $row.append($('<td>').append($('<a>').text('install').attr('href', '/dmx/repository/' + name + '/clone')));
        }
        $table.append($row);
      };
  $.each(repositories.items, function (i, r) { renderRepository(r) });
});
