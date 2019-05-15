(function($) {
    $.fn.mergeCell = function(options) {
        return this.each(function() {
            var cols = options.cols;
            for (var i = cols.length - 1; cols[i] != undefined; i--) {
                mergeCell($(this), cols[i]);
            }
            dispose($(this));
        });
    };
    function mergeCell($table, colIndex) {
        $table.data('col-content', '');
        $table.data('col-rowspan', 1); 
        $table.data('col-td', $());  
        $table.data('trNum', $('tbody tr', $table).length);
        $('tbody tr', $table).each(function(index) {
            var $td = $('td:eq(' + colIndex + ')', this);
            var currentContent = $td.html();
            if ($table.data('col-content') == '') {
                $table.data('col-content', currentContent);
                $table.data('col-td', $td);
            } else {
                if ($table.data('col-content') == currentContent) {
                    var rowspan = $table.data('col-rowspan') + 1;
                    $table.data('col-rowspan', rowspan);
                    $td.hide();
                    if (++index == $table.data('trNum')) $table.data('col-td').attr('rowspan', $table.data('col-rowspan'));
                } else { 
                    if ($table.data('col-rowspan') != 1) {
                        $table.data('col-td').attr('rowspan', $table.data('col-rowspan'));
                    }
                    $table.data('col-td', $td);
                    $table.data('col-content', $td.html());
                    $table.data('col-rowspan', 1);
                }
            }
        });
    }
    function dispose($table) {
        $table.removeData();
    }
})(jQuery);