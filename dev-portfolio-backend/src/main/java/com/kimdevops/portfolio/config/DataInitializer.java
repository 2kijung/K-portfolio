package com.kimdevops.portfolio.config;

import com.kimdevops.portfolio.entity.*;
import com.kimdevops.portfolio.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private VisitorRepository visitorRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create admin user
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@portfolio.com");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setRole(User.Role.ADMIN);
            admin.setCreatedAt(LocalDateTime.now());
            userRepository.save(admin);
        }

        // Create sample projects
        if (projectRepository.count() == 0) {
            createSampleProjects();
        }

        // Create sample contacts
        if (contactRepository.count() == 0) {
            createSampleContacts();
        }

        // Create sample visitors
        if (visitorRepository.count() == 0) {
            createSampleVisitors();
        }

        // Create sample profile (기본정보)
        if (profileRepository.count() == 0) {
            createSampleProfile();
        }
    }

    private void createSampleProfile() {
        Profile profile = new Profile();
        profile.setName("김개발");
        profile.setBirthDate("1995");
        profile.setLocation("서울특별시");
        profile.setUniversity("한국대학교");
        profile.setMajor("컴퓨터공학과");
        profile.setGraduationStatus("졸업");
        profile.setMilitaryStatus("군필");
        profile.setIntroduction("성장을 즐기는 백엔드 개발자입니다.");
        profile.setEmail("dev@example.com");
        profile.setGithubUrl("https://github.com/");
        profile.setBlogUrl("");
        profile.setCreatedAt(LocalDateTime.now());
        profileRepository.save(profile);
    }

    private void createSampleProjects() {
        String[][] projectsData = {
            {"E-Commerce Platform", "Full-stack e-commerce with Spring Boot backend", "Spring Boot, React, PostgreSQL, Docker, Kubernetes", "PRODUCTION"},
            {"Microservices Architecture", "Distributed system with multiple services", "Spring Cloud, Kafka, Docker, Kubernetes, gRPC", "PRODUCTION"},
            {"Real-time Analytics Dashboard", "Live data visualization platform", "Spring Boot, React, WebSocket, Redis, Elasticsearch", "PRODUCTION"},
            {"API Gateway & Service Mesh", "Enterprise API management solution", "Spring Cloud Gateway, Istio, Kubernetes, gRPC", "PRODUCTION"},
        };

        for (String[] data : projectsData) {
            Project project = new Project();
            project.setTitle(data[0]);
            project.setDescription(data[1]);
            project.setTechnologies(data[2]);
            project.setStatus(Project.Status.valueOf(data[3]));
            project.setFeatured(true);
            project.setDisplayOrder((int)(projectRepository.count() + 1));
            project.setCreatedAt(LocalDateTime.now());
            projectRepository.save(project);
        }
    }

    private void createSampleContacts() {
        String[][] contactsData = {
            {"John Doe", "john@example.com", "Project Inquiry", "Interested in your microservices expertise"},
            {"Jane Smith", "jane@example.com", "Collaboration", "Let's work together on a Kubernetes project"},
            {"Tech Lead", "tech@company.com", "Consulting", "Need help with Spring Boot migration"},
        };

        for (String[] data : contactsData) {
            Contact contact = new Contact();
            contact.setName(data[0]);
            contact.setEmail(data[1]);
            contact.setSubject(data[2]);
            contact.setMessage(data[3]);
            contact.setStatus(Contact.Status.NEW);
            contact.setCreatedAt(LocalDateTime.now());
            contactRepository.save(contact);
        }
    }

    private void createSampleVisitors() {
        for (int i = 0; i < 50; i++) {
            Visitor visitor = new Visitor();
            visitor.setIpAddress("192.168.1." + (i % 256));
            visitor.setPage(i % 2 == 0 ? "/" : "/projects");
            visitor.setSessionId("session-" + i);
            visitor.setVisitedAt(LocalDateTime.now().minusHours(i));
            visitorRepository.save(visitor);
        }
    }
}
