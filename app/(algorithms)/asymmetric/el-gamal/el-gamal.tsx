'use client';

import { ArrowLeftRight, ArrowRightLeft, Download, Eraser } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { useGlobalAlert } from '@/components/alert';
import {
  decrypt,
  downloadResult,
  encrypt,
  generateSteps,
} from '@/utilities/algorithms/asymmetric/el-gamal-utils';
import { autoResize } from '@/utilities/dom/auto-resize-textarea';
import { isPrime } from '@/utilities/math/prime-number-utils';

export default function ElGamal() {
  const showAlert = useGlobalAlert();

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const pValueRef = useRef<HTMLInputElement>(null);
  const gValueRef = useRef<HTMLInputElement>(null);
  const yValueRef = useRef<HTMLInputElement>(null);
  const xValueRef = useRef<HTMLInputElement>(null);
  const kValueRef = useRef<HTMLInputElement>(null);
  const plainRef = useRef<HTMLTextAreaElement>(null);
  const cipherRef = useRef<HTMLTextAreaElement>(null);

  const [pValue, setPValue] = useState('');
  const [gValue, setGValue] = useState('');
  const [yValue, setYValue] = useState('');
  const [xValue, setXValue] = useState('');
  const [kValue, setKValue] = useState('');
  const [isKValueAuto, setIsKValueAuto] = useState(false);
  const [isSwap, setIsSwap] = useState<boolean>(false);
  const [plainLabel] = useState<string>('PLAIN TEXT');
  const [cipherLabel] = useState<string>('CIPHER TEXT');
  const [plainText, setPlainText] = useState<string>('');
  const [cipherText, setCipherText] = useState<string>('');
  const [calculationSteps, setCalculationSteps] = useState<string>('');

  const handlePValueChange = () => {
    if (!pValueRef.current) return;

    const rawP = pValueRef.current.value.trim();

    if (!/^\d*$/.test(rawP)) {
      showAlert('error', 'Only numeric input is allowed!');
      return;
    }

    setPValue(rawP);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (!rawP) return;

      const pNumber = parseInt(rawP, 10);
      if (isNaN(pNumber)) return;

      if (pNumber < 2) {
        showAlert('warning', 'Value must be greater than or equal to 2!');
        return;
      }

      if (!isPrime(pNumber)) {
        showAlert('warning', 'Value must be a prime number!');
        return;
      }

      setPValue(pNumber.toString());
    }, 400);
  };

  const handleGValueChange = () => {
    if (!gValueRef.current) return;

    const rawG = gValueRef.current.value.trim();

    if (!/^\d*$/.test(rawG)) {
      showAlert('error', 'Only numeric input is allowed!');
      return;
    }

    setGValue(rawG);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (rawG === '') return;

      const gNumber = parseInt(rawG, 10);
      if (isNaN(gNumber)) return;

      if (gNumber < 1) {
        showAlert('warning', 'g value must be greater than or equal to 1!');
        return;
      }

      setGValue(gNumber.toString());
    }, 400);
  };

  const handleYValueChange = () => {
    if (!yValueRef.current) return;

    const rawY = yValueRef.current.value.trim();

    if (!/^\d*$/.test(rawY)) {
      showAlert('error', 'Only numeric input is allowed!');
      return;
    }

    setYValue(rawY);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (rawY === '') return;

      const yNumber = parseInt(rawY, 10);
      if (isNaN(yNumber)) return;

      if (yNumber < 1) {
        showAlert('warning', 'y value must be greater than or equal to 1!');
        return;
      }

      setYValue(yNumber.toString());
    }, 400);
  };

  const handleXValueChange = () => {
    if (!xValueRef.current) return;

    const rawX = xValueRef.current.value.trim();

    if (!/^\d*$/.test(rawX)) {
      showAlert('error', 'Only numeric input is allowed!');
      return;
    }

    setXValue(rawX);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (rawX === '') return;

      const xNumber = parseInt(rawX, 10);
      if (isNaN(xNumber)) return;

      if (xNumber < 1) {
        showAlert('warning', 'x value must be greater than or equal to 1!');
        return;
      }

      setXValue(xNumber.toString());
    }, 400);
  };

  const handleKValueChange = () => {
    if (!kValueRef.current) return;

    const rawK = kValueRef.current.value.trim();

    if (!/^\d*$/.test(rawK)) {
      showAlert('error', 'Only numeric input is allowed!');
      return;
    }

    setKValue(rawK);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (rawK === '') return;

      const kNumber = parseInt(rawK, 10);
      if (isNaN(kNumber)) return;

      if (kNumber < 1) {
        showAlert('warning', 'k value must be greater than or equal to 1!');
        return;
      }

      setKValue(kNumber.toString());
    }, 400);
  };

  const handleDownload = () => {
    const isPlainEmpty = plainText.trim() === '';
    const isCipherEmpty = cipherText.trim() === '';

    if (isSwap) {
      const p = parseInt(pValue);
      const x = parseInt(xValue);

      if (
        !xValue ||
        !pValue ||
        isNaN(x) ||
        isNaN(p) ||
        x < 1 ||
        p < 2 ||
        !isPrime(p) ||
        isPlainEmpty ||
        isCipherEmpty
      ) {
        showAlert('error', 'Fields must not be empty or key is invalid!');
        return;
      }

      showAlert('success', 'Download completed successfully!');

      downloadResult({
        mode: 'decrypt',
        cipherText,
        plainText,
        params: { x, p },
      });
    } else {
      const y = parseInt(yValue);
      const g = parseInt(gValue);
      const p = parseInt(pValue);
      const k = parseInt(kValue);

      if (
        !yValue ||
        !gValue ||
        !pValue ||
        !kValue ||
        [y, g, p, k].some((v) => isNaN(v)) ||
        g < 1 ||
        y < 1 ||
        k < 1 ||
        k > p - 1 ||
        p < 2 ||
        !isPrime(p) ||
        isPlainEmpty ||
        isCipherEmpty
      ) {
        showAlert('error', 'Fields must not be empty or key is invalid!');
        return;
      }

      showAlert('success', 'Download completed successfully!');

      downloadResult({
        mode: 'encrypt',
        plainText,
        cipherText,
        params: { y, g, p, k },
      });
    }
  };

  const handleClear = () => {
    setPValue('');
    setGValue('');
    setYValue('');
    setXValue('');
    setKValue('');
    setIsKValueAuto(false);
    setIsSwap(false);
    setPlainText('');
    setCipherText('');
    setCalculationSteps('');
  };

  useEffect(() => {
    if (isSwap) {
      setYValue('');
      setGValue('');
      setKValue('');
      setIsKValueAuto(false);
    } else {
      setXValue('');
    }

    setPlainText('');
    setCipherText('');
    setCalculationSteps('');
  }, [isSwap]);

  useEffect(() => {
    if (!isKValueAuto) return;

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      const rawP = pValueRef.current?.value.trim() || '';

      if (rawP === '') {
        showAlert('warning', 'Please enter p value first!');
        return;
      }

      const pNumber = parseInt(rawP, 10);
      if (isNaN(pNumber) || pNumber < 2 || !isPrime(pNumber)) {
        showAlert('warning', 'Please enter valid p value!');
        return;
      }

      const randomK = Math.floor(Math.random() * (pNumber - 1)) + 1;
      setKValue(randomK.toString());
    }, 500);

    return () => clearTimeout(debounceTimeout.current!);
  }, [isKValueAuto, pValue]);

  useEffect(() => {
    if (!plainText.trim()) return;

    const p = parseInt(pValue);
    if (isNaN(p) || p < 2 || !isPrime(p)) return;

    if (isSwap) {
      const x = parseInt(xValue);
      if (isNaN(x) || x < 1 || x >= p) return;

      try {
        const decrypted = decrypt({ plainText, x, p });
        setCipherText(decrypted);
        setCalculationSteps(
          generateSteps({ text: plainText, x, p, isDecrypt: true }),
        );
      } catch (err) {
        showAlert('error', 'Decryption failed. Please check your input!');
      }
    } else {
      const y = parseInt(yValue);
      const g = parseInt(gValue);
      const k = parseInt(kValue);

      if ([g, y, k].some((v) => isNaN(v))) return;

      try {
        const encrypted = encrypt({ plainText, y, g, p, k });
        setCipherText(encrypted);
        setCalculationSteps(
          generateSteps({ text: plainText, y, g, p, k, isDecrypt: false }),
        );
      } catch (err) {
        showAlert('error', 'Encryption failed. Please check your input!');
      }
    }
  }, [plainText, yValue, gValue, pValue, kValue, xValue, isSwap]);

  useEffect(() => {
    autoResize(plainRef.current);
    autoResize(cipherRef.current);
  }, [plainText, cipherText]);

  return (
    <section className="pb-12 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center py-10">
          El-Gamal Algorithm
        </h2>

        <div className="bg-base-200 p-6 rounded-xl mb-4 shadow-md">
          {isSwap ? (
            <div className="flex w-full flex-col">
              <div className="flex justify-center items-center gap-2">
                <span className="text-5xl font-code">(</span>

                <input
                  type="text"
                  ref={xValueRef}
                  inputMode="numeric"
                  required
                  placeholder="x"
                  pattern="[0-9]*"
                  value={xValue}
                  className="input font-code w-full text-center text-current outline-none focus:outline-none focus:ring-0"
                  onChange={handleXValueChange}
                />

                <span className="text-xl font-code">,</span>

                <input
                  type="text"
                  ref={pValueRef}
                  inputMode="numeric"
                  required
                  placeholder="p"
                  pattern="[0-9]*"
                  value={pValue}
                  className="input font-code w-full text-center text-current outline-none focus:outline-none focus:ring-0"
                  onChange={handlePValueChange}
                />

                <span className="text-5xl font-code">)</span>
              </div>
            </div>
          ) : (
            <div className="flex grid grid-cols-2 gap-8 w-full">
              <div className="flex justify-center items-center gap-2">
                <span className="text-5xl font-code">(</span>

                <input
                  type="text"
                  ref={yValueRef}
                  inputMode="numeric"
                  required
                  placeholder="y"
                  pattern="[0-9]*"
                  value={yValue}
                  className="input font-code w-full text-center text-current outline-none focus:outline-none focus:ring-0"
                  onChange={handleYValueChange}
                />

                <span className="text-xl font-code">,</span>

                <input
                  type="text"
                  ref={gValueRef}
                  inputMode="numeric"
                  required
                  placeholder="g"
                  pattern="[0-9]*"
                  value={gValue}
                  className="input font-code w-full text-center text-current outline-none focus:outline-none focus:ring-0"
                  onChange={handleGValueChange}
                />

                <span className="text-xl font-code">,</span>

                <input
                  type="text"
                  ref={pValueRef}
                  inputMode="numeric"
                  required
                  placeholder="p"
                  pattern="[0-9]*"
                  value={pValue}
                  className="input font-code w-full text-center text-current outline-none focus:outline-none focus:ring-0"
                  onChange={handlePValueChange}
                />

                <span className="text-5xl font-code">)</span>
              </div>

              <div className="flex flex-col justify-center items-center gap-2 w-full">
                <input
                  type="text"
                  ref={kValueRef}
                  inputMode="numeric"
                  required
                  placeholder="k"
                  pattern="[0-9]*"
                  value={kValue}
                  onChange={handleKValueChange}
                  readOnly={isKValueAuto}
                  className="input font-code w-full text-center text-current outline-none focus:outline-none focus:ring-0"
                />

                <div className="flex grid grid-cols-2 w-full pt-2">
                  <label className="flex items-center justify-center gap-2">
                    <input
                      type="radio"
                      name="radio-k-mode"
                      className="radio radio-1"
                      checked={isKValueAuto}
                      onChange={() => {
                        setIsKValueAuto(true);
                      }}
                    />
                    <span className="text-sm">Automatically K Value</span>
                  </label>

                  <label className="flex justify-center items-center gap-2">
                    <input
                      type="radio"
                      name="radio-k-mode"
                      className="radio radio-1"
                      checked={!isKValueAuto}
                      onChange={() => {
                        setKValue('');
                        setIsKValueAuto(false);
                      }}
                    />
                    <span className="text-sm">Manually K Value</span>
                  </label>
                </div>
              </div>
            </div>
          )}
          <div className="divider"></div>
          <div className="grid grid-cols-2 gap-8 w-full flex justify-items-center">
            <button
              className="btn btn-neutral w-full flex"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4 text-current" />
              Download
            </button>
            <button
              className="btn btn-neutral w-full flex"
              onClick={handleClear}
            >
              <Eraser className="w-4 h-4 text-current" />
              Clear
            </button>
          </div>
        </div>

        <div className="relative w-full">
          <div className="tabs tabs-border w-full flex">
            <input
              type="radio"
              name="my-tabs"
              className="tab flex-1 text-center"
              aria-label="Encrypt & Decrypt"
              defaultChecked
            />
            <div className="tab-content">
              <div className="absolute top-24 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <label className="btn btn-circle swap swap-rotate bg-transparent border-none outline-none focus:ring-0">
                  <input
                    type="checkbox"
                    checked={isSwap}
                    onChange={() => setIsSwap((prev) => !prev)}
                  />
                  <ArrowRightLeft className="swap-off w-4 h-4 text-current" />
                  <ArrowLeftRight className="swap-on w-4 h-4 text-current" />
                </label>
              </div>

              <div className="pt-4">
                <div className="grid grid-cols-2">
                  <div
                    className={`text-lg text-center font-medium mb-2 ${
                      isSwap ? 'order-2' : 'order-1'
                    }`}
                  >
                    {plainLabel}
                  </div>
                  <div
                    className={`text-lg text-center font-medium mb-2 ${
                      isSwap ? 'order-1' : 'order-2'
                    }`}
                  >
                    {cipherLabel}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div
                    className={`form-control ${isSwap ? 'order-2' : 'order-1'}`}
                  >
                    <textarea
                      ref={isSwap ? cipherRef : plainRef}
                      className="textarea font-code bg-base-200 text-justify outline-none focus:outline-none focus:ring-0 min-h-48 w-full resize-none overflow-hidden"
                      placeholder={
                        isSwap
                          ? 'Your decryption message is here...'
                          : 'Enter your message...'
                      }
                      required
                      value={isSwap ? cipherText : plainText}
                      spellCheck={false}
                      onChange={(e) =>
                        isSwap
                          ? setCipherText(e.target.value)
                          : setPlainText(e.target.value)
                      }
                      readOnly={isSwap ? true : false}
                    />
                  </div>
                  <div
                    className={`form-control ${isSwap ? 'order-1' : 'order-2'}`}
                  >
                    <textarea
                      ref={isSwap ? plainRef : cipherRef}
                      className="textarea font-code bg-base-200 text-justify outline-none focus:outline-none focus:ring-0 min-h-48 w-full resize-none overflow-hidden"
                      placeholder={
                        isSwap
                          ? 'Enter your message...'
                          : 'Your encryption message is here...'
                      }
                      value={isSwap ? plainText : cipherText}
                      spellCheck={false}
                      onChange={(e) =>
                        isSwap
                          ? setPlainText(e.target.value)
                          : setCipherText(e.target.value)
                      }
                      readOnly={isSwap ? false : true}
                    />
                  </div>
                </div>
              </div>
            </div>
            <input
              type="radio"
              name="my-tabs"
              className="tab flex-1 text-center"
              aria-label="Result Calculation Step"
            />
            <div className="tab-content p-6">
              <div className="mockup-code w-full">
                {calculationSteps.split('\n').map((line, index) => (
                  <pre
                    key={index}
                    {...(line.trim() !== '' ? { 'data-prefix': '$' } : {})}
                  >
                    <code>{line}</code>
                  </pre>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
