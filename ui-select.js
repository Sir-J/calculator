(function ($) {
    $.fn.uiSelect = function (options) {
        var $this = this;

        var settings = $.extend({
            selectedId: 0,
            isOpen: false
        }, options);

        var content = `
                        <div class="ui-select__toggler">
                            <div class="ui-select__toggler__trigger">
                                <span class="icon-font icon-select-control"></span>
                            </div>
                            <div class="ui-select__toggler__text">
                                <span data-toggler-text data-fake-id></span>
                            </div>
                        </div>
                        <div class="ui-select__dropdown" tabindex="1" style="opacity: 1; transition: opacity 120ms;">
                            <div>
                                <div class="ui-select__scrollable-container has-scrollbar ui-scrollbar">
                                    <div class="ui-select__scrollable" tabindex="0" style="margin-right: -17px;">
                                        <div class="ui-select__list"> </div>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    `;
        var itemLine = '<div class="ui-select__item" data-fake-id="{id}">{name}</div>';

        $this.addClass('ui-select ui-select--block').html(content);

        for (var idx in settings.data) {
            $this
                .find('.ui-select__list')
                .append(itemLine.replace('{id}', settings.data[idx].id).replace('{name}', settings.data[idx].name));
            if (settings.data[idx].id === settings.selectedId) {
                $this
                    .find('[data-toggler-text]')
                    .attr('data-fake-id', settings.data[idx].id)
                    .html(settings.data[idx].name);

                $this
                    .find('.ui-select__list')
                    .find(`[data-fake-id=${settings.data[idx].id}]`)
                    .addClass('ui-select__item--selected');
            }
        }

        $this.click(function (event) {
            if (settings.isOpen) {
                $this.find('.ui-select__dropdown').hide();
            } else {
                $this.find('.ui-select__dropdown').show();
            }
            settings.isOpen = settings.isOpen ? false : true;
        });

        $this
            .find('.ui-select__item')
            .mouseover(function (event) {
                $(event.target).addClass('ui-select__item--focused');
            })
            .mouseout(function (event) {
                $(event.target).removeClass('ui-select__item--focused');
            })
            .click(function (event) {
                var el = $(event.target);
                settings.selectedId = parseInt($(el).attr('data-fake-id'));
                $this
                    .find('.ui-select__item--selected')
                    .removeClass('ui-select__item--selected');

                $(el).addClass('ui-select__item--selected');

                $this
                    .find('[data-toggler-text]')
                    .attr('data-fake-id', settings.selectedId)
                    .html($(el)[0].innerText);

            });

        $(document).mouseup(function (e) {
            if ($this.has(e.target).length === 0) {
                $this.find('.ui-select__dropdown').hide();
                settings.isOpen = false;
            }
        });
    };
})(jQuery);