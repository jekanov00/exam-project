import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './howitworks.module.sass';

function HowItWorks() {
  return (
    <>
      <Header />
      <section className={styles.description}>
        <div className={styles.container}>
          <div className={styles.video}>video</div>
          <article className={styles.descriptionExposition}>
            <h1 className={styles.sectionHeader}>How Does Squadhelp Work?</h1>
            <p>
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
          <div>5 steps</div>
          <div>
            <Link className={styles.startContestBtn} to="/startContest">
              START A CONTEST
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.faq}>
        <div className={styles.container}>
          <h1 className={styles.sectionHeader}>Frequently Asked Questions</h1>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>Why should I use Squadhelp?</h2>
            <p>
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
            <p>
              Since 2011, we have been committed to disrupting the traditional agency model. Our
              platform offers much more than a typical crowdsourcing experience. From Machine
              Learning to Audience Testing to Comprehensive Trademark Validation, you receive
              best-in-class support for your branding projects.
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>Will you help me validate my name?</h2>
            <p>
              Yes! We believe that validating and securing your name is a critical part of your
              branding process. Squadhelp offers domain checks,{' '}
              <a className={styles.link} href={'https://google.com'}>Trademark support</a>, linguistics analysis, and{' '}
              <a className={styles.link} href={'https://google.com'}>professional audience testing</a> to help you choose
              your name with confidence. We even have special prices for Trademark filing for our
              customers.
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>I’ve never used Squadhelp before. What should I expect?</h2>
            <p>
              Most customers tell us that Squadhelp’s process is effective, easy, fast, and even
              fun. We constantly hear <a className={styles.link} href={'https://google.com'}>extremely positive feedback</a>{' '}
              with respect to the breadth of ideas submitted to each contest, and many customers are
              surprised at how insightful working with dozens of creative individuals from across
              the globe can be.
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>What kind of work can I crowdsource?</h2>
            <p>
              You can host competitions for Naming, Taglines, Logos, Business cards, Package design,
              other design projects, and even Product feedback and research.
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>What if I don't like anyone's work?</h2>
            <p>
              Our creatives work extremely hard to ensure a successful outcome for all projects. If
              you do not like any of the submissions, we can add more days to your contest at no
              extra cost. In addition, our Gold and Platinum Packages come with a partial refund
              option. If you do not like the quality of submissions, you can request a refund for
              the contest award fees (if you keep your contest award as "Not Guaranteed"). We also
              offer complimentary branding consultation to ensure you get the best outcome from your
              contest. Read more about our <a className={styles.link} href={'https://google.com'}>Refund policy</a>.
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>Can I see any examples?</h2>
            <p>
              Our creatives have submitted more than 5 Million names and thousands of logos on our
              platform. Here are some examples of Names, Taglines, and Logos that were submitted in
              recent contests.
            </p>
            <ul>
              <li>
                <a className={styles.link} href={'https://google.com'}>Name Examples</a>
              </li>
              <li>
                <a className={styles.link} href={'https://google.com'}>Tagline Examples</a>
              </li>
              <li>
                <a className={styles.link} href={'https://google.com'}>Logo Examples</a>
              </li>
            </ul>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>Where can I read about feedback from other customers?</h2>
            <p>
              Thousands of customers have used Squadhelp to find great Names, Taglines and Logos for
              their businesses. Here are some of the{' '}
              <a className={styles.link} href={'https://google.com'}>recent customer testimonials</a>.
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>Who should use Squadhelp?</h2>
            <p>
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
            <p>
              We are an open platform built on the core belief that anyone can have a great idea.
              However, we’ve invested heavily to ensure that the best Creatives on our site
              participate the most in your contest. Our Quality Scoring algorithm and Gamification
              best practices ensure high-quality submission and superior collaboration.
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>How much does it cost?</h2>
            <p>
              Our naming competitions start at $199, and our logo design competitions start at $299.
              Also, there are three additional contest level that each offer more features and
              benefits. See our <a className={styles.link} href={'https://google.com'}>Pricing Page</a> for details.
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>Do you offer any discount for multiple contests?</h2>
            <p>
              Yes! We have many contest bundles - our most popular being our Name, Tagline, and Logo
              bundle. Bundles allow you to purchase multiple contests at one time and save as much
              as from $75 - $400. You can learn more about our bundle options on our{' '}
              <a className={styles.link} href={'https://google.com'}>Pricing Page</a>.
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>What if I want to keep my business idea private?</h2>
            <p>
              You can select a Non Disclosure Agreement (NDA) option at the time of launching your
              competition. This will ensure that only those contestants who agree to the NDA will be
              able to read your project brief and participate in the contest. The contest details
              will be kept private from other users, as well as search engines.
            </p>
          </article>
          <article className={styles.question}>
            <h2 className={styles.questionHeader}>Can you serve customers outside the US?</h2>
            <p>
              Absolutely. Squadhelp services organizations across the globe. Our customer come from
              many countries, such as the United States, Australia, Canada, Europe, India, and MENA.
              We’ve helped more than 25,000 customer around the world.
            </p>
          </article>
        </div>
      </section>
      <section className={styles.getInTouch}>
        <div className={styles.container}>
          <div>envelope</div>
          <article>
            <h2 className={styles.touchHeader}>Questions?</h2>
            <p>
              Check out our <a className={styles.link} href={'https://google.com'}>FAQs</a> or send us a{' '}
              <a className={styles.link} href={'https://google.com'}>message</a>. For assistance with launching a contest,
              you can also call us at (877) 355-3585 or schedule a{' '}
              <a className={styles.link} href={'https://google.com'}>Branding Consultation</a>
            </p>
          </article>
          <div>
            <button>GET IN TOUCH</button>
          </div>
        </div>
      </section>
      <Footer />
      <a className={styles.scrollup} href={'#header'}>Scroll Up</a>
    </>
  );
}

export default HowItWorks;
