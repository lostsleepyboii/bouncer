if (rangeSlider) {
  noUiSlider.create(rangeSlider, {
    start: [13, 9999],
    connect: true,
    step: 1,
    range: {
      'min': [13],
      '10%': [50],
      '20%': [300],
      '40%': [1200],
      'max': [9999]
    }
  });

  rangeSlider.noUiSlider.on('update', function(values, handle) {
    inputs[handle].value = Math.round(values[handle]);
  });

  const setRangeSlider = (i, value) => {
    let arr = [null, null];
    arr[i] = value;

    rangeSlider.noUiSlider.set(arr);
  };

  inputs.forEach((el, index) => {
    el.addEventListener('change', (e) => {
      setRangeSlider(index, e.currentTarget.value);
    });
  });
}