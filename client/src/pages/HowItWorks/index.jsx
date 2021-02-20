import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './howitworks.module.sass';
import CONSTANTS from '../../constants';

function HowItWorks() {
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);
  const scrollBtn = document.getElementsByClassName(styles.scrollup)[0];

  useEffect(() => {
    document.title = 'How Does Squadhelp Work? | Squadhelp';
    const onScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', onScroll);
    if (scrollBtn) {
      if (scrollPosition <= 400 && scrollBtn.style.opacity === '0.5') {
        scrollBtn.style.zIndex = '-1';
        scrollBtn.style.opacity = '0';
        scrollBtn.animate([{ opacity: '0.5' }, { opacity: '0' }], { duration: 200 });
      } else if (scrollPosition > 400 && scrollBtn.style.opacity === '0') {
        scrollBtn.style.zIndex = '9999';
        scrollBtn.style.opacity = '0.5';
        scrollBtn.animate([{ opacity: '0' }, { opacity: '0.5' }], { duration: 200 });
      }
    }
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollPosition, scrollBtn]);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Header />
      <section className={styles.description}>
        <div className={styles.container}>
          <div className={styles.video}>
            <video
              src={`${CONSTANTS.STATIC_IMAGES_PATH}howitworks.bin`}
              crossOrigin={'anonymous'}
              poster={`${CONSTANTS.STATIC_IMAGES_PATH}howitworks_thumbnail.webp`}
              aria-label={'Video'}
              defaultplaybackrate={'1'}
              controlsList={'nodownload'}
              playsInline
              controls>
              <track
                kind={'captions'}
                label={'English'}
                srcLang={'eng'}
                src={'https://fast.wistia.net/embed/captions/vfxvect60o.vtt?language=eng'}
              />
            </video>
          </div>
          <article className={styles.descriptionExposition}>
            <h1 className={styles.sectionHeader}>How Does Squadhelp Work?</h1>
            <p className={styles.text}>
              Squadhelp allows you to host branding competitions to engage with the most creative
              people across the globe and get high-quality results, fast. Thousands of creatives
              compete with each other, suggesting great name ideas. At the end of the collaborative
              contest, you select one winner. The winner gets paid, and you get a strong brand name
              that will help you succeed! It's quick, simple, and costs a fraction of an agency.
            </p>
          </article>
        </div>
      </section>
      <section className={styles.steps}>
        <div className={styles.container}>
          <h1 className={styles.sectionHeader}>5 Simple Steps</h1>
          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h2 className={styles.stepHeader}>Start Your Contest</h2>
              <p className={styles.text}>
                Complete our fast, easy project brief template, and we’ll share it with our
                community of more than 70,000 Creatives.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h2 className={styles.stepHeader}>Ideas Start Pouring In</h2>
              <p className={styles.text}>
                You will start receiving name ideas - created specifically for you - within minutes.
                Dozens of contestants work for you at the same time! A typical naming contest
                receives several hundred name ideas. All ideas are automatically checked for URL
                availability.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h2 className={styles.stepHeader}>Collaborate and Communicate</h2>
              <p className={styles.text}>
                See all your submissions from your contest dashboard. Rate entries, leave private
                comments, and send public messages, leading the process towards the perfect name.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <h2 className={styles.stepHeader}>Validate</h2>
              <p className={styles.text}>
                Choose your name with confidence. Our unique validation process includes domain
                checks, trademark risk assessment, linguistics analysis, and professional audience
                testing.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>5</div>
              <h2 className={styles.stepHeader}>Pick your winner!</h2>
              <p className={styles.text}>
                Once your contest ends, announce the winner - and register the name. Come back to
                Squadhelp to launch a Logo Design or Tagline project for your name.
              </p>
            </div>
          </div>
          <div className={styles.startContestContainer}>
            <Link className={styles.startContestBtn} to="/startContest">
              START A CONTEST
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.faq}>
        <div className={styles.container}>
          <div className={styles.questionsHeaderContainer}>
            <div className={styles.questionMark}>?</div>
            <h1 className={styles.sectionHeader}>Frequently Asked Questions</h1>
          </div>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>Why should I use Squadhelp?</h2>
            <p className={styles.text}>
              You always have an option of hiring a consultant or coming up with the name yourself.
              However, Squadhelp builds great brands that succeed faster by connecting you with the
              most creative people across the globe. Most importantly, Squadhelp provides you with
              choice: you get to see ideas from dozens (in some cases, hundreds) of contestants
              before you select a winner. Typically, you would spend far less money with Squadhelp
              (our contests start at $199) than hiring an agency. Also, you will receive immediate
              results - most contests begin receiving submissions within minutes of starting.
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>How is Squadhelp Different?</h2>
            <p className={styles.text}>
              Since 2011, we have been committed to disrupting the traditional agency model. Our
              platform offers much more than a typical crowdsourcing experience. From Machine
              Learning to Audience Testing to Comprehensive Trademark Validation, you receive
              best-in-class support for your branding projects.
            </p>
            <p className={styles.text}>
              <strong>Breadth:</strong> Our Contest-Based Crowdsourcing approach allows you to
              receive an unmatched breadth of name ideas from dozens of unique, creative minds while
              working with the world's largest branding community.
            </p>
            <p className={styles.text}>
              <strong>Quality and Collaboration:</strong> Using an advanced Quality Scoring
              Algorithm, we ensure that you receive more ideas from our top-quality creatives, and
              we use Gamification best practices to encourage high-quality brainstorming and two-way
              communication throughout your contest.
            </p>
            <p className={styles.text}>
              <strong>We don’t stop at ideation:</strong> Choose your name with confidence through
              our high-end validation services. Poll your target demographics to get unbiased
              feedback on your favorite names, and receive Trademark Risk and Linguistics Analysis
              Reports developed by a Licensed Trademark Attorney.
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>Will you help me validate my name?</h2>
            <p className={styles.text}>
              Yes! We believe that validating and securing your name is a critical part of your
              branding process. Squadhelp offers domain checks,{' '}
              <a className={styles.link} href={'https://google.com'}>
                Trademark support
              </a>
              , linguistics analysis, and{' '}
              <a className={styles.link} href={'https://google.com'}>
                professional audience testing
              </a>{' '}
              to help you choose your name with confidence. We even have special prices for
              Trademark filing for our customers.
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>
              I’ve never used Squadhelp before. What should I expect?
            </h2>
            <p className={styles.text}>
              Most customers tell us that Squadhelp’s process is effective, easy, fast, and even
              fun. We constantly hear{' '}
              <a className={styles.link} href={'https://google.com'}>
                extremely positive feedback
              </a>{' '}
              with respect to the breadth of ideas submitted to each contest, and many customers are
              surprised at how insightful working with dozens of creative individuals from across
              the globe can be.
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>What kind of work can I crowdsource?</h2>
            <p className={styles.text}>
              You can host competitions for Naming, Taglines, Logos, Business cards, Package design,
              other design projects, and even Product feedback and research.
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>What if I don't like anyone's work?</h2>
            <p className={styles.text}>
              Our creatives work extremely hard to ensure a successful outcome for all projects. If
              you do not like any of the submissions, we can add more days to your contest at no
              extra cost. In addition, our Gold and Platinum Packages come with a partial refund
              option. If you do not like the quality of submissions, you can request a refund for
              the contest award fees (if you keep your contest award as "Not Guaranteed"). We also
              offer complimentary branding consultation to ensure you get the best outcome from your
              contest. Read more about our{' '}
              <a className={styles.link} href={'https://google.com'}>
                Refund policy
              </a>
              .
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>Can I see any examples?</h2>
            <p className={styles.text}>
              Our creatives have submitted more than 5 Million names and thousands of logos on our
              platform. Here are some examples of Names, Taglines, and Logos that were submitted in
              recent contests.
            </p>
            <ul>
              <li>
                <a className={styles.link} href={'https://google.com'}>
                  Name Examples
                </a>
              </li>
              <li>
                <a className={styles.link} href={'https://google.com'}>
                  Tagline Examples
                </a>
              </li>
              <li>
                <a className={styles.link} href={'https://google.com'}>
                  Logo Examples
                </a>
              </li>
            </ul>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>
              Where can I read about feedback from other customers?
            </h2>
            <p className={styles.text}>
              Thousands of customers have used Squadhelp to find great Names, Taglines and Logos for
              their businesses. Here are some of the{' '}
              <a className={styles.link} href={'https://google.com'}>
                recent customer testimonials
              </a>
              .
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>Who should use Squadhelp?</h2>
            <p className={styles.text}>
              Our disruptive approach to naming and branding has been used successfully by just
              about every type of venture imaginable. Startups and small businesses love our
              affordable pricing, SM&#38;B gravitate towards our end-to-end service, and large
              international businesses are particularly excited by the breadth of ideas and the
              rapid results. We have also worked with nonprofits, municipalities, associations,
              event planners, agencies, and more.
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>Who will be working on my contest?</h2>
            <p className={styles.text}>
              We are an open platform built on the core belief that anyone can have a great idea.
              However, we’ve invested heavily to ensure that the best Creatives on our site
              participate the most in your contest. Our Quality Scoring algorithm and Gamification
              best practices ensure high-quality submission and superior collaboration.
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>How much does it cost?</h2>
            <p className={styles.text}>
              Our naming competitions start at $199, and our logo design competitions start at $299.
              Also, there are three additional contest level that each offer more features and
              benefits. See our{' '}
              <a className={styles.link} href={'https://google.com'}>
                Pricing Page
              </a>{' '}
              for details.
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>
              Do you offer any discount for multiple contests?
            </h2>
            <p className={styles.text}>
              Yes! We have many contest bundles - our most popular being our Name, Tagline, and Logo
              bundle. Bundles allow you to purchase multiple contests at one time and save as much
              as from $75 - $400. You can learn more about our bundle options on our{' '}
              <a className={styles.link} href={'https://google.com'}>
                Pricing Page
              </a>
              .
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>
              What if I want to keep my business idea private?
            </h2>
            <p className={styles.text}>
              You can select a Non Disclosure Agreement (NDA) option at the time of launching your
              competition. This will ensure that only those contestants who agree to the NDA will be
              able to read your project brief and participate in the contest. The contest details
              will be kept private from other users, as well as search engines.
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>Can you serve customers outside the US?</h2>
            <p className={styles.text}>
              Absolutely. Squadhelp services organizations across the globe. Our customer come from
              many countries, such as the United States, Australia, Canada, Europe, India, and MENA.
              We’ve helped more than 25,000 customer around the world.
            </p>
          </article>
        </div>
      </section>
      <section className={styles.getInTouch}>
        <div className={styles.container}>
          <div className={styles.envelopeContainer}>
            <div className={styles.envelope}>
              <i className={'far fa-envelope'} />
            </div>
          </div>
          <article className={styles.touchArticle}>
            <h2 className={styles.touchHeader}>Questions?</h2>
            <p className={styles.text}>
              Check out our{' '}
              <a className={styles.link} href={'https://google.com'}>
                FAQs
              </a>{' '}
              or send us a{' '}
              <a className={styles.link} href={'https://google.com'}>
                message
              </a>
              . For assistance with launching a contest, you can also call us at (877) 355-3585 or
              schedule a{' '}
              <a className={styles.link} href={'https://google.com'}>
                Branding Consultation
              </a>
            </p>
          </article>
          <div className={styles.touchBtnContainer}>
            <button className={styles.touchBtn}>GET IN TOUCH</button>
          </div>
        </div>
      </section>
      <Footer />
      <button className={styles.scrollup} onClick={scrollToTop} style={{ opacity: 0 }}>
        <i className={'fas fa-arrow-circle-up'} />
      </button>
    </>
  );
}

export default HowItWorks;
